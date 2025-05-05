import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { StripeConnectedAccountCreatedEvent } from '../../../stripe-billing/events';
import { StripeService } from 'nest-utils';
import { CreateStripeConnectedAccountCommand } from '../impl';

@CommandHandler(CreateStripeConnectedAccountCommand)
export class CreateStripeConnectedAccountCommandHandler
  implements ICommandHandler<CreateStripeConnectedAccountCommand>
{
  constructor(
    private readonly stripeService: StripeService,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    userId,
  }: CreateStripeConnectedAccountCommand): Promise<string> {
    const [link, account] =
      await this.stripeService.createConnectHostedAccount();
    this.eventBus.publish(
      new StripeConnectedAccountCreatedEvent({
        stripeId: account.id,
        userId,
      }),
    );
    return link.url;
  }
}
