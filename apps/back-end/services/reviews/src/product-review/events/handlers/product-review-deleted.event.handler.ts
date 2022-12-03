import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdateProductRatingCommand } from '@product-review/commands';
import { ProductReviewDeletedEvent } from '@product-review/events';

@EventsHandler(ProductReviewDeletedEvent)
export class ProductReviewDeletedEventHandler
  implements IEventHandler<ProductReviewDeletedEvent>
{
  constructor(private readonly commandbus: CommandBus) {}

  handle({ review }: ProductReviewDeletedEvent) {
    this.commandbus.execute<UpdateProductRatingCommand>(
      new UpdateProductRatingCommand(review.productId, review.rate, 'dec'),
    );
  }
}
