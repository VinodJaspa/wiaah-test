import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductRatingCommand } from '@product-review/commands/impl';
import { ProductRating } from '@product-review/entities';
import { ProductRatingCreatedEvent } from '@product-review/events';
import { ProductRatingRepository } from '@product-review/repository';

@CommandHandler(CreateProductRatingCommand)
export class CreateProductRatingCommandHandler
  implements ICommandHandler<CreateProductRatingCommand>
{
  constructor(
    private readonly repo: ProductRatingRepository,
    private readonly eventbus: EventBus,
  ) {}

  async execute({
    productId,
  }: CreateProductRatingCommand): Promise<ProductRating> {
    const res = await this.repo.create(productId);
    this.eventbus.publish(new ProductRatingCreatedEvent(res));
    return res;
  }
}
