import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SellerServicePurchasedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { VerifyBookedServiceCommand } from '@book-service/commands';

@Controller()
export class BookServiceController {
  constructor(private readonly commandbus: CommandBus) {}

  @EventPattern(KAFKA_EVENTS.BILLING_EVNETS.sellerServicePurchased())
  handleServicePurchased(
    @Payload() { value }: { value: SellerServicePurchasedEvent },
  ) {
    this.commandbus.execute(
      new VerifyBookedServiceCommand(value.input.serviceBookId),
    );
  }
}
