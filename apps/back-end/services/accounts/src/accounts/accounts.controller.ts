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
import { KAFKA_MESSAGES, KAFKA_EVENTS } from 'nest-utils';
import { EmailExistsMessage, EmailExistsMessageReply } from 'nest-dto';
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @MessagePattern(KAFKA_MESSAGES.emailExists)
  async emailExists(
    @Payload() payload: { value: EmailExistsMessage },
  ): Promise<EmailExistsMessageReply> {
    const exists = await this.accountService.emailExists(
      payload.value.emailExistsMsgInput.email,
    );
    return new EmailExistsMessageReply({ emailExists: exists });
  }

  @MessagePattern(KAFKA_MESSAGES.getAccountByEmail)
  getAccountByEmail(@Payload() payload: { value: GetAccountByEmailDto }) {
    return this.accountService.getByEmail(payload.value.email);
  }

  @EventPattern(KAFKA_EVENTS.createAccount)
  createAccount(@Payload() payload: { value: CreateAccountInput }) {
    this.accountService.createAccountRecord(payload.value);
  }

  @MessagePattern(KAFKA_MESSAGES.isSellerAccount)
  async checkIsSellerAccount(@Payload() payload: { value: { id: string } }) {
    try {
      if (!payload?.value?.id) throw new Error('invalid arguments');
      const res = await this.accountService.isSellerAccount(payload?.value?.id);
      return res;
    } catch (error) {
      return false;
    }
  }
}
