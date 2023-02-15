import { Inject } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { UpdateProductRatingCommand } from '@product-review/commands';
import { ReviewProductType } from '@product-review/const';
import { ProductReviewedEvent } from '@product-review/events';
import { ReviewCreatedEvemt } from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';

@EventsHandler(ProductReviewedEvent)
export class ProductReviewedEventHandler
  implements IEventHandler<ProductReviewedEvent>
{
  constructor(
    private readonly commandbus: CommandBus,
    @Inject(SERVICES.REVIEWS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ review }: ProductReviewedEvent) {
    this.commandbus.execute<UpdateProductRatingCommand>(
      new UpdateProductRatingCommand(review.productId, review.rate, 'inc'),
    );

    this.eventClient.emit(
      KAFKA_EVENTS.REVIEWS_EVENTS.reviewCreated(ReviewProductType),
      new ReviewCreatedEvemt({
        contentAuthorId: review.sellerId,
        rating: review.rate,
        reviewerId: review.reviewerId,
        reviewId: review.id,
        contentId: review.productId,
      }),
    );
  }
}
