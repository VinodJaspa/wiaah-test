import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AccountsService } from './accounts.service';
import { CreateAccountInput } from './dto/create-account.input';
import { GetAccountByEmailDto } from './dto/get-account-by-email.dto';
import { KAFKA_MESSAGES, KAFKA_EVENTS } from 'nest-utils';
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @MessagePattern(KAFKA_MESSAGES.emailExists)
  emailExists(@Payload() payload: { value: GetAccountByEmailDto }) {
    return this.accountService.emailExists(payload.value.email);
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
