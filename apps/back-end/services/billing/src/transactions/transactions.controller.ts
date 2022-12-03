import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { KAFKA_MESSAGES } from 'nest-utils';
@Controller()
export class TransactionsController {
  @MessagePattern(KAFKA_MESSAGES.ACCOUNTS_MESSAGES.emailExists)
  test() {
    console.log('test');
  }
}
