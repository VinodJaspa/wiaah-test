import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  IncreaseProductEarningsCommand,
  IncrementProductSalesCommand,
} from '@products/command';
import { Product } from '@products/entities';
import { ProductPurchasedEvent } from '@products/events';

@EventsHandler(ProductPurchasedEvent)
export class ProductPurchasedEventHandler
  implements IEventHandler<ProductPurchasedEvent>
{
  constructor(private readonly commandBus: CommandBus) {}

  async handle({ productId }: ProductPurchasedEvent) {
    const res = await this.commandBus.execute<
      IncrementProductSalesCommand,
      Product
    >(new IncrementProductSalesCommand(productId));

    this.commandBus.execute<IncreaseProductEarningsCommand>(
      new IncreaseProductEarningsCommand(res.id, res.price),
    );
  }
}

@EventsHandler(ProductPurchasedEvent)
export class ProductOrderConfirmationEmailHandler
  implements IEventHandler<ProductPurchasedEvent>
{
  constructor(private readonly commandBus: CommandBus) {}

  async handle({ productId }: ProductPurchasedEvent) {}
}
