import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KAFKA_EVENTS } from 'nest-utils';
import { CreateProductRatingCommand } from '@product-review/commands';
import { NewProductCreatedEvent } from 'nest-dto';

@Controller()
export class ProductReviewController {
  constructor(private readonly commandbus: CommandBus) {}

  @EventPattern(KAFKA_EVENTS.PRODUCTS_EVENTS.productCreated)
  async handleProductCreated(
    @Payload() { value }: { value: NewProductCreatedEvent },
  ) {
    await this.commandbus.execute<CreateProductRatingCommand>(
      new CreateProductRatingCommand(value.input.id, value.input.ownerId),
    );
  }
}
