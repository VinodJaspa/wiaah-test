import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { StripeService } from 'nest-utils';

import { StripeProductCreatedEvent } from '@stripe-billing/events';
import {
  CreateStripeProductCommand,
  StripeProductCommandRes,
} from '@stripe-billing/commands/impl';

@CommandHandler(CreateStripeProductCommand)
export class CreateStripeProductCommandHandler
  implements ICommandHandler<CreateStripeProductCommand>
{
  constructor(
    private readonly stripeService: StripeService,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    input: { productId, type, name },
  }: CreateStripeProductCommand): Promise<StripeProductCommandRes> {
    const res = await this.stripeService.createStripeProduct(name);

    this.eventBus.publish<StripeProductCreatedEvent>(
      new StripeProductCreatedEvent({
        ogId: productId,
        stripeProductId: res.id,
        type,
      }),
    );

    return {
      stripeProductId: res.id,
    };
  }
}
