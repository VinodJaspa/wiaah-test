import { Controller } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { AccountsService } from './accounts.service';
import { CreateAccountInput } from './dto/create-account.input';
import { GetAccountByEmailDto } from './dto/get-account-by-email.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @MessagePattern('email_exists')
  getUser(@Payload() payload: { value: GetAccountByEmailDto }) {
    return this.accountService.emailExists(payload.value.email);
  }

  @MessagePattern('get.account.by.email')
  getAccountByEmail(@Payload() payload: { value: GetAccountByEmailDto }) {
    console.log(payload);
    return this.accountService.getByEmail(payload.value.email);
  }

  @EventPattern('create_account')
  createAccount(@Payload() payload: { value: CreateAccountInput }) {
    console.log('create account payload', payload.value);
    this.accountService.createAccountRecord(payload.value);
  }
}
