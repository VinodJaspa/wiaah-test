import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @MessagePattern('email_exists')
  getUser(data: any) {
    console.log(data);
    return this.accountService.emailExists(data.value.email);
  }
}
