import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { StripeService } from '@stripe';

import { GetUserStripeCustomerIdQuery } from '../../queries';
import { PaymentIntent } from '../../entities';
import { CreateMembershipPaymentIntentCommand } from '../impl';

@CommandHandler(CreateMembershipPaymentIntentCommand)
export class CreateMembershipPaymentIntentCommandHandler
  implements ICommandHandler<CreateMembershipPaymentIntentCommand>
{
  constructor(
    private readonly stripeService: StripeService,
    private readonly querybus: QueryBus,
  ) {}

  async execute({
    input,
    user,
  }: CreateMembershipPaymentIntentCommand): Promise<PaymentIntent> {
    const customerId = await this.querybus.execute<
      GetUserStripeCustomerIdQuery,
      string
    >(new GetUserStripeCustomerIdQuery(user));

    const res = await this.stripeService.createCustomerSubscription(
      customerId,
      input.membershipPriceId,
    );

    return {
      client_secret: res.clientSecret,
    };
  }
}
