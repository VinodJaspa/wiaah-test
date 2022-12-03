import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { StripeService } from '@stripe';
import { CreateStripeTieredPriceCommand } from '@stripe-billing/commands';
import { StripeTieredPriceCreatedEvent } from '@stripe-billing/events';

@CommandHandler(CreateStripeTieredPriceCommand)
export class CreateStripeTieredPriceCommandHandler
  implements ICommandHandler<CreateStripeTieredPriceCommand>
{
  constructor(
    private readonly stripeService: StripeService,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    input: { prices, productId, recurring, ogId, type },
  }: CreateStripeTieredPriceCommand): Promise<void> {
    const price = await this.stripeService.createStripeTieredPrice(
      productId,
      prices,
      recurring === 'month'
        ? 'monthly'
        : recurring === 'year'
        ? 'yearly'
        : 'monthly',
    );

    this.eventBus.publish(
      new StripeTieredPriceCreatedEvent({
        ogProductId: ogId,
        prices,
        stripeProductId: productId,
        productType: type,
        stripePriceId: price.id,
      }),
    );
  }
}
