import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateStripeMonthlyPriceCommand } from '@stripe-billing/commands/impl';
import { StripeService } from '@stripe';
import { StripeMonthlyPriceCreatedEvent } from '@stripe-billing/events';

@CommandHandler(CreateStripeMonthlyPriceCommand)
export class CreateStripePriceCommandHandler
  implements ICommandHandler<CreateStripeMonthlyPriceCommand>
{
  constructor(
    private readonly stripeService: StripeService,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    input: { productOgId, productType, stripeProductId, priceInCents },
  }: CreateStripeMonthlyPriceCommand): Promise<string> {
    const price = await this.stripeService.createMonthlyPrice(
      stripeProductId,
      priceInCents,
    );

    this.eventBus.publish(
      new StripeMonthlyPriceCreatedEvent({
        ogProductId: productOgId,
        price: priceInCents,
        productType,
        stripePriceId: price.id,
        stripeProductId,
      }),
    );

    return price.id;
  }
}
