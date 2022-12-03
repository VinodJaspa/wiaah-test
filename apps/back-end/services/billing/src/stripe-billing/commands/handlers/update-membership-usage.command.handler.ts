import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StripeService } from '@stripe';

import { UpdateMembershipUsageCommand } from '../impl';

@CommandHandler(UpdateMembershipUsageCommand)
export class UpdateMembershipUsageCommandHandler
  implements ICommandHandler<UpdateMembershipUsageCommand>
{
  constructor(private readonly stripeService: StripeService) {}

  async execute({
    membershipSubscriptionId,
    usage,
  }: UpdateMembershipUsageCommand): Promise<void> {
    const res = await this.stripeService.updateSubscriptionItemUsage(
      membershipSubscriptionId,
      usage,
    );
  }
}
