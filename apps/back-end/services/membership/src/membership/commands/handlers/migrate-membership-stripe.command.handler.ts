import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MembershipRepository } from '@membership/repository';
import { MigrateMembershipStripeIdCommand } from '../impl';

@CommandHandler(MigrateMembershipStripeIdCommand)
export class MigrateMembershipStripeIdCommandHandler
  implements ICommandHandler<MigrateMembershipStripeIdCommand>
{
  constructor(private readonly membershipRepo: MembershipRepository) {}

  async execute({
    membershipId,
    stripePriceId,
  }: MigrateMembershipStripeIdCommand): Promise<void> {}
}
