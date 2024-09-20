import {
  Controller,
  Inject,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import {
  KAFKA_MESSAGES,
  KAFKA_EVENTS,
  SERVICES,
  accountType,
} from 'nest-utils';
import {
  AccountDeletedEvent,
  AccountVerifiedEvent,
  BuyerAccountRegisteredEvent,
  EmailExistsMessage,
  EmailExistsMessageReply,
  GetAccountMetaDataByEmailMessage,
  GetAccountMetaDataByEmailMessageReply,
  GetAdminAccountByEmailMessageReply,
  GetAdminAccountByEmailMesssage,
  KafkaPayload,
  NewProductCreatedEvent,
  PasswordChangedEvent,
  ProductPurchasedEvent,
  SellerAccountRegisteredEvent,
  StripeAccountCreatedEvent,
  SubscriptionPaidEvent,
  UserHasStripeAccountMessage,
  UserHasStripeAccountMessageReply,
} from 'nest-dto';
import { CommandBus } from '@nestjs/cqrs';

import { AccountsService } from '@accounts/accounts.service';
import {
  IncreamentUserProductsCount,
  IncreamentUserSalesCommand,
  UpdateUserMembershipCommand,
} from '@accounts/commands';
import { Account } from '@accounts/entities';
import { PrismaService } from 'prismaService';
import { AccountDeletionRequestStatus } from '@prisma-client';

@Controller()
export class AccountsController implements OnModuleInit {
  private logger = new Logger(AccountsController.name);
  constructor(
    private readonly accountService: AccountsService,
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly commandBus: CommandBus,
    private readonly prisma: PrismaService,
  ) { }
  @EventPattern('find.account')
  async handleFindAccount(@Payload() data: { email: string }) {
    // Perform a search for the account in the database
    const account = await this.prisma.account.findUnique({
      where: { email: data.email },
    });
    return account;
  }

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.deleteAccount)
  async handleDeleteAccount(@Payload() { value }: { value: { id: string } }) {
    if (!value?.id) return;

    const res = await this.accountService.deleteAccount(value.id);
    if (res) {
      this.eventsClient.emit(
        KAFKA_EVENTS.ACCOUNTS_EVENTS.accountDeleted,
        new AccountDeletedEvent({
          accountId: res.id,
        }),
      );
      this.prisma.accountDeletionRequest.update({
        where: {
          accountId: res.id,
        },
        data: {
          status: AccountDeletionRequestStatus.rejected,
        },
      });
    }
  }

  @MessagePattern(KAFKA_MESSAGES.ACCOUNTS_MESSAGES.hasStripeId)
  async hasStripeId(@Payload() value: UserHasStripeAccountMessage) {
    try {
      const {
        input: { userId },
      } = value;
      const account = await this.accountService.findOne(userId);
      if (!account)
        throw new NotFoundException('user with the given id was not found');

      return new UserHasStripeAccountMessageReply({
        error: null,
        success: true,
        data: { hasAccount: typeof account.stripeId === 'string' },
      });
    } catch (error) { }
  }

  @MessagePattern(KAFKA_MESSAGES.ACCOUNTS_MESSAGES.emailExists)
  async emailExists(
    @Payload() payload: KafkaPayload<EmailExistsMessage>,
  ): Promise<EmailExistsMessageReply> {
    try {
      const exists = await this.accountService.emailExists(
        payload.value.input.email,
      );

      return new EmailExistsMessageReply({
        success: true,
        data: { emailExists: exists },
        error: null,
      });
    } catch (err) {
      return new EmailExistsMessageReply({
        success: false,
        data: null,
        error: err,
      });
    }
  }

  @MessagePattern(KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAccountByEmail)
  async getAccountByEmail(
    @Payload() payload: KafkaPayload<GetAccountMetaDataByEmailMessage>,
  ): Promise<GetAccountMetaDataByEmailMessageReply> {
    try {
      const {
        value: {
          input: { email },
        },
      } = payload;

      const account = await this.accountService.getByEmail(email);
      return new GetAccountMetaDataByEmailMessageReply({
        success: true,
        data: {
          ...account,
        },
        error: null,
      });
    } catch (error) {
      return new GetAccountMetaDataByEmailMessageReply({
        success: false,
        data: null,
        error: error.message,
      });
    }
  }

  @MessagePattern(KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAccountById)
  async getAccountById(@Payload() payload: { value: { accountId: string } }) {
    console.log(
      'GET ACCOUNT BY ID Payload =======> ' + JSON.stringify(payload),
    );
    const { accountId } = payload.value;

    console.log('GET ACCOUNT BY ID ACCOUNTID =======> ' + accountId);
    try {
      const accountExists = await this.accountService.getById(accountId);
      if (!accountExists) {
        throw new Error('Account for this ID was not found');
      }
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  @MessagePattern('add.product.to.account')
  async addProductToAccount(
    @Payload() payload: { value: { sellerId: string; productId: string } },
  ) {
    const { sellerId, productId } = payload.value;

    // Log payload details for debugging
    console.log(
      `Received payload for seller: ${sellerId}, product: ${productId}`,
    );

    try {
      // Step 1: Fetch the current products for the account
      const account = await this.prisma.account.findUnique({
        where: { id: sellerId },
        select: { products: true }, // Only fetch the products field
      });

      if (!account) {
        throw new Error(`Account with ID ${sellerId} not found`);
      }

      const currentProducts = account.products ?? [];
      console.log(`Current products for account ${sellerId}:`, currentProducts);

      // Step 2: Append the new product ID to the list if it's not already present
      if (currentProducts.includes(productId)) {
        console.log(
          `Product ${productId} is already in the account's products list`,
        );
        return { message: 'Product already exists in account' };
      }

      const updatedProducts = [...currentProducts, productId];
      console.log(
        `Updated products list for account ${sellerId}:`,
        updatedProducts,
      );

      // Step 3: Update the account with the new product list
      await this.prisma.account.update({
        where: { id: sellerId },
        data: { products: updatedProducts },
      });

      return { message: 'Product successfully added to account' };
    } catch (error) {
      // Enhanced error logging and rethrowing for better traceability
      console.error(`Error adding product to account: ${error.message}`);
      throw new Error(`Failed to add product to account: ${error.message}`);
    }
  }
  @MessagePattern(KAFKA_MESSAGES.ACCOUNTS_MESSAGES.isSellerAccount)
  async checkIsSellerAccount(@Payload() payload: { value: { id: string } }) {
    try {
      if (!payload?.value?.id) throw new Error('invalid arguments');
      const res = await this.accountService.isSellerAccount(payload?.value?.id);
      return res;
    } catch (error) {
      return false;
    }
  }

  @MessagePattern(KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAdminAccountByEmail)
  async getAdminAccountAccount(
    @Payload() payload: { value: GetAdminAccountByEmailMesssage },
  ): Promise<GetAdminAccountByEmailMessageReply> {
    try {
      console.log('admin account', payload.value);
      if (!payload?.value?.input?.email) throw new Error('invalid arguments');
      const res = await this.accountService.getByEmail(
        payload?.value?.input.email,
      );

      if (res.accountType !== accountType.ADMIN)
        throw new Error('admin account for this email was not found');

      return new GetAdminAccountByEmailMessageReply({
        data: res,
        error: null,
        success: true,
      });
    } catch (error) {
      console.log('error', error);
      return new GetAdminAccountByEmailMessageReply({
        data: null,
        error: error,
        success: false,
      });
    }
  }

  @EventPattern(
    KAFKA_EVENTS.BILLING_EVNETS.billingSubscriptionActivated('membership'),
  )
  handleMembershipPaid(@Payload() { value }: { value: SubscriptionPaidEvent }) {
    this.commandBus.execute<UpdateUserMembershipCommand, Account>(
      new UpdateUserMembershipCommand(value.input.userId, value.input.id),
    );
  }

  @EventPattern(KAFKA_EVENTS.AUTH_EVENTS.sellerAccountRegistered)
  handleCreateSellerAccount(
    @Payload() payload: KafkaPayload<SellerAccountRegisteredEvent>,
  ) {
    this.accountService.createAccountRecord({
      firstName: payload.value.input.firstName,
      lastName: payload.value.input.lastName,
      email: payload.value.input.email,
      password: payload.value.input.password,
      companyRegisterationNumber:
        payload.value.input.companyRegisterationNumber,
      accountType: 'seller',
      status: 'pending',
      birthDate: payload.value.input.birthDate,
    });
  }

  @EventPattern(KAFKA_EVENTS.AUTH_EVENTS.buyerAccountRegistered)
  handleCreateBuyerAccount(
    @Payload() payload: KafkaPayload<BuyerAccountRegisteredEvent>,
  ) {
    this.accountService.createAccountRecord({
      firstName: payload.value.input.firstName,
      lastName: payload.value.input.lastName,
      email: payload.value.input.email,
      password: payload.value.input.password,
      accountType: 'buyer',
      status: 'active',
      birthDate: payload.value.input.birthDate,
    });
  }

  @EventPattern(KAFKA_EVENTS.AUTH_EVENTS.accountVerified)
  handleAccountVerified(
    @Payload()
    { value }: KafkaPayload<AccountVerifiedEvent>,
  ) {
    const {
      input: { email },
    } = value;
    this.accountService.handleVerifyAccount(email);
  }

  @EventPattern(KAFKA_EVENTS.AUTH_EVENTS.passwordChanged)
  changePassword(@Payload() { value }: KafkaPayload<PasswordChangedEvent>) {
    try {
      const {
        input: { newPassword, id },
      } = value;
      this.accountService.updatePassword(newPassword, id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @EventPattern(KAFKA_EVENTS.BILLING_EVNETS.stripeAccountCreated)
  async addStripeId(@Payload() value: StripeAccountCreatedEvent) {
    try {
      const {
        input: { stripeId, userId },
      } = value;
      await this.accountService.updateStripeId(stripeId, userId);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @EventPattern(KAFKA_EVENTS.PRODUCTS_EVENTS.productCreated)
  handleProductCreated(
    @Payload() { value }: { value: NewProductCreatedEvent },
  ) {
    const {
      input: { ownerId },
    } = value;

    this.commandBus.execute(
      new IncreamentUserProductsCount(ownerId, value.input.id),
    );
  }

  @EventPattern(KAFKA_EVENTS.PRODUCTS_EVENTS.productPurchased)
  handleProductPurchased(
    @Payload() { value }: { value: ProductPurchasedEvent },
  ) {
    const {
      input: { sellerId },
    } = value;

    this.commandBus.execute(new IncreamentUserSalesCommand(sellerId, 1));
  }

  async onModuleInit() {
    await this.eventsClient.connect();

    this.eventsClient.subscribeToResponseOf('add.product.to.account');
  }
}
