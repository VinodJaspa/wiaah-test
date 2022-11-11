import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { StripeService } from '@stripe';

import { StripeCustomerCreatedEvent } from '../../events';
import { CreateStripeCustomerCommand } from '../impl';

@CommandHandler(CreateStripeCustomerCommand)
export class CreateStripeCustomerCommandHandler
  implements ICommandHandler<CreateStripeCustomerCommand>
{
  constructor(
    private readonly stripeService: StripeService,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    email,
    name,
    accountId,
  }: CreateStripeCustomerCommand): Promise<void> {
    const customer = await this.stripeService.createCustomer(name, email);

    this.eventBus.publish<StripeCustomerCreatedEvent>(
      new StripeCustomerCreatedEvent(accountId, customer.id),
    );
  }
}
