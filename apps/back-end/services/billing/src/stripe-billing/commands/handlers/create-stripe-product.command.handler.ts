import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { StripeService } from '@stripe';

import { StripeProductCreatedEvent } from '../../events';
import { CreateStripeProductCommand } from '../impl';

@CommandHandler(CreateStripeProductCommand)
export class CreateStripeProductCommandHandler
  implements ICommandHandler<CreateStripeProductCommand>
{
  constructor(
    private readonly stripeService: StripeService,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    productId,
    type,
    name,
  }: CreateStripeProductCommand): Promise<void> {
    const res = await this.stripeService.createStripeProduct(name);

    this.eventBus.publish<StripeProductCreatedEvent>(
      new StripeProductCreatedEvent({
        ogId: productId,
        stripeProductId: res.id,
        type,
      }),
    );
  }
}
