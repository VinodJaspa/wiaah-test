import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NewProductCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { CreateProductPostCommand } from '@product-post/commands';
import { CreateProductPostInput } from '@product-post/dto';

@Controller()
export class ProductPostController {
  constructor(private readonly commandbus: CommandBus) {}

  @EventPattern(KAFKA_EVENTS.PRODUCTS_EVENTS.productCreated)
  async handleNewProduct(
    @Payload() { value }: { value: NewProductCreatedEvent },
  ) {
    let input: CreateProductPostInput = {
      productId: value.input.id,
    };
    await this.commandbus.execute<CreateProductPostCommand>(
      new CreateProductPostCommand(input, value.input.ownerId),
    );
  }
}
