import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { StripeService } from 'nest-utils';

import { GetMembershipPriceIdQuery } from '@stripe-billing/queries';
import { PaymentIntent } from '@stripe-billing/entities';
import { CreateMembershipPaymentIntentCommand } from '@stripe-billing/commands/impl';
import { ProductTypeEnum } from '@stripe-billing/const';

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
    const priceIds = await this.querybus.execute<
      GetMembershipPriceIdQuery,
      string[]
    >(new GetMembershipPriceIdQuery(input.membershipId, user));

    const res = await this.stripeService.createCustomerSubscription(
      user.stripeCustomerId,
      priceIds,
      {
        itemId: input.membershipId,
        itemType: ProductTypeEnum.membership,
        userId: user.id,
      },
    );

    return {
      client_secret: res?.clientSecret,
    };
  }
}
