import { Controller, Inject, Logger, OnModuleInit } from '@nestjs/common';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { AccountsService } from './accounts.service';
import { CreateAccountInput } from './dto/create-account.input';
import { GetAccountByEmailDto } from './dto/get-account-by-email.dto';
import {
  KAFKA_MESSAGES,
  KAFKA_EVENTS,
  formatCaughtError,
  SERVICES,
  KAFKA_SERVICE_TOKEN,
} from 'nest-utils';
import {
  AccountRegisteredEvent,
  AccountVerifiedEvent,
  EmailExistsMessage,
  EmailExistsMessageReply,
  GetAccountMetaDataByEmailMessage,
  GetAccountMetaDataByEmailMessageReply,
  KafkaPayload,
  PasswordChangedEvent,
} from 'nest-dto';
@Controller()
export class AccountsController implements OnModuleInit {
  private logger = new Logger(AccountsController.name);
  constructor(
    private readonly accountService: AccountsService,
    @Inject(SERVICES.SHOPPING_CART_SERVICE.token)
    private readonly shoppingCartClient: ClientKafka,
    @Inject(SERVICES.WISHLIST_SERVICE.token)
    private readonly wishlistClient: ClientKafka,
    @Inject(KAFKA_SERVICE_TOKEN) private readonly eventsClient: ClientKafka,
  ) {}

  @MessagePattern(KAFKA_MESSAGES.ACCOUNTS_MESSAGES.emailExists)
  async emailExists(
    @Payload() payload: KafkaPayload<EmailExistsMessage>,
  ): Promise<EmailExistsMessageReply> {
    console.log('called');
    try {
      const exists = await this.accountService.emailExists(
        payload.value.input.email,
      );

      console.log('done');
      return new EmailExistsMessageReply({
        success: true,
        data: { emailExists: exists },
        error: null,
      });
    } catch (err) {
      return new EmailExistsMessageReply({
        success: false,
        data: null,
        error: formatCaughtError(err),
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
      const { firstName, password, type, id } = account;
      return new GetAccountMetaDataByEmailMessageReply({
        success: true,
        data: { accountType: type, email, password, firstName, id },
        error: null,
      });
    } catch (error) {
      return new GetAccountMetaDataByEmailMessageReply({
        success: false,
        data: null,
        error: formatCaughtError(error),
      });
    }
  }

  @EventPattern(KAFKA_EVENTS.AUTH_EVENTS.accountRegistered)
  createAccount(@Payload() payload: KafkaPayload<AccountRegisteredEvent>) {
    this.accountService.createAccountRecord({
      ...payload.value.input,
      type: payload.value.input.accountType,
    });
  }

  @EventPattern(KAFKA_EVENTS.AUTH_EVENTS.accountVerified)
  handleAccountVerified(
    @Payload()
    { value }: KafkaPayload<AccountVerifiedEvent>,
  ) {
    console.log('account,verfifed', value);
    const {
      input: { email },
    } = value;
    this.accountService.handleVerifiedAccount(email);
  }

  @EventPattern(KAFKA_EVENTS.AUTH_EVENTS.passwordChanged)
  changePassword(@Payload() { value }: KafkaPayload<PasswordChangedEvent>) {
    try {
      const {
        input: { email, newPassword, id },
      } = value;
      console.log(value);
      this.accountService.update(id, { password: newPassword });
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
  async onModuleInit() {
    await this.eventsClient.connect();
    await this.wishlistClient.connect();
    await this.shoppingCartClient.connect();
  }
}
