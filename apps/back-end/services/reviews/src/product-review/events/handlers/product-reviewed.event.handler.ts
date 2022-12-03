import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdateProductRatingCommand } from '@product-review/commands';
import { ProductReviewedEvent } from '@product-review/events';

@EventsHandler(ProductReviewedEvent)
export class ProductReviewedEventHandler
  implements IEventHandler<ProductReviewedEvent>
{
  constructor(private readonly commandbus: CommandBus) {}

  handle({ review }: ProductReviewedEvent) {
    this.commandbus.execute<UpdateProductRatingCommand>(
      new UpdateProductRatingCommand(review.productId, review.rate, 'inc'),
    );
  }
}
