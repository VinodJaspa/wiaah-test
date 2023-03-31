import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { StripeService } from 'nest-utils';

import { StripeProductUpdatedEvent } from '../../events';
import { UpdateStripeProductCommand } from '../impl';

@CommandHandler(UpdateStripeProductCommand)
export class UpdatedStripeProductCommandHandler
  implements ICommandHandler<UpdateStripeProductCommand>
{
  constructor(
    public readonly stripeService: StripeService,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    name,
    productId,
    type,
  }: UpdateStripeProductCommand): Promise<void> {
    const res = await this.stripeService.updateStripeProduct(name);

    this.eventBus.publish<StripeProductUpdatedEvent>(
      new StripeProductUpdatedEvent({
        ogId: productId,
        stripeProductId: res.id,
        type,
      }),
    );
  }
}
