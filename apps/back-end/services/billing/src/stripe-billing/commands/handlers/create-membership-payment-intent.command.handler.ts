import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { StripeService } from '@stripe';

import {
  GetMembershipPriceIdQuery,
  GetUserStripeCustomerIdQuery,
} from '@stripe-billing/queries';
import { PaymentIntent } from '@stripe-billing/entities';
import { CreateMembershipPaymentIntentCommand } from '@stripe-billing/commands/impl';

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
    const customerIdPromise = this.querybus.execute<
      GetUserStripeCustomerIdQuery,
      string
    >(new GetUserStripeCustomerIdQuery(user));

    const membershipPriceIdPromise = this.querybus.execute<
      GetMembershipPriceIdQuery,
      string
    >(new GetMembershipPriceIdQuery(input.membershipId, user));

    const res = await this.stripeService.createCustomerSubscription(
      await customerIdPromise,
      await membershipPriceIdPromise,
    );

    console.log(JSON.stringify(res.subscriptionObj.latest_invoice, null, 2));

    return {
      client_secret: res.clientSecret,
    };
  }
}
