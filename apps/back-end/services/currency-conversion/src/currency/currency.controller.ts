import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class CurrencyController {
  constructor() {}

  @EventPattern('testEvent')
  test(@Payload() payload) {
    console.log('currency test event', payload);
  }
}
