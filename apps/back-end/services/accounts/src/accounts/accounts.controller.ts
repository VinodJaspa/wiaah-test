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
import { KAFKA_MESSAGES, KAFKA_EVENTS, SERVICES } from 'nest-utils';
import {
  AccountRegisteredEvent,
  AccountVerifiedEvent,
  BuyerAccountRegisteredEvent,
  EmailExistsMessage,
  EmailExistsMessageReply,
  GetAccountMetaDataByEmailMessage,
  GetAccountMetaDataByEmailMessageReply,
  KafkaPayload,
  PasswordChangedEvent,
  SellerAccountRegisteredEvent,
  StripeAccountCreatedEvent,
  UserHasStripeAccountMessage,
  UserHasStripeAccountMessageReply,
} from 'nest-dto';

import { AccountsService } from './accounts.service';

@Controller()
export class AccountsController implements OnModuleInit {
  private logger = new Logger(AccountsController.name);
  constructor(
    private readonly accountService: AccountsService,
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  @MessagePattern('test')
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
    } catch (error) {}
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
      const { firstName, password, type, id, lastName, verified } = account;
      return new GetAccountMetaDataByEmailMessageReply({
        success: true,
        data: {
          accountType: type,
          email,
          password,
          firstName,
          lastName,
          id,
          emailVerified: verified,
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
      type: 'seller',
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
      type: 'buyer',
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
        input: { email, newPassword, id },
      } = value;
      console.log(value);
      this.accountService.updatePassword(newPassword, id);
    } catch (error) {
      this.logger.error(error);
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

  async onModuleInit() {
    await this.eventsClient.connect();
  }
}
