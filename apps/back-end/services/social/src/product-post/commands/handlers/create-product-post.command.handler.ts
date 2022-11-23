import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductPostCommand } from '@product-post/commands/impl';
import { ProductPost } from '@product-post/entities';
import { ProductPostCreatedEvent } from '@product-post/events';
import { ProductPostRepository } from '@product-post/repository';

@CommandHandler(CreateProductPostCommand)
export class CreateProductPostCommandHandler
  implements ICommandHandler<CreateProductPostCommand>
{
  constructor(
    private readonly repo: ProductPostRepository,
    private readonly eventbus: EventBus,
  ) {}

  async execute({
    input,
    userId,
  }: CreateProductPostCommand): Promise<ProductPost> {
    const res = await this.repo.create(input, userId);
    this.eventbus.publish(new ProductPostCreatedEvent(res));
    return res;
  }
}
