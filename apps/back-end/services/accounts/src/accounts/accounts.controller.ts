import { Controller, Inject, OnModuleInit } from '@nestjs/common';
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
} from 'nest-utils';
import { EmailExistsMessage, EmailExistsMessageReply } from 'nest-dto';
@Controller('accounts')
export class AccountsController implements OnModuleInit {
  constructor(
    private readonly accountService: AccountsService,
    @Inject(SERVICES.SHOPPING_CART_SERVICE.token)
    private readonly shoppingCartClient: ClientKafka,
    @Inject(SERVICES.WISHLIST_SERVICE.token)
    private readonly wishlistClient: ClientKafka,
  ) {}

  @MessagePattern(KAFKA_MESSAGES.ACCOUNTS_MESSAGES.emailExists)
  async emailExists(
    @Payload() payload: { value: EmailExistsMessage },
  ): Promise<EmailExistsMessageReply> {
    const date = Date.now();
    try {
      console.log(payload);
      const exists = await this.accountService.emailExists(
        payload.value.input.email,
      );

      console.log('success', date - Date.now());
      return new EmailExistsMessageReply({
        success: true,
        data: { emailExists: exists },
        error: null,
      });
    } catch (err) {
      console.log('err', err, date - Date.now());
      return new EmailExistsMessageReply({
        success: false,
        data: null,
        error: formatCaughtError(err),
      });
    }
  }

  @MessagePattern(KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAccountByEmail)
  getAccountByEmail(@Payload() payload: { value: GetAccountByEmailDto }) {
    return this.accountService.getByEmail(payload.value.email);
  }

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENT.createAccount)
  createAccount(@Payload() payload: { value: CreateAccountInput }) {
    this.accountService.createAccountRecord(payload.value);
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
    await this.wishlistClient.connect();
    await this.shoppingCartClient.connect();
  }
}
