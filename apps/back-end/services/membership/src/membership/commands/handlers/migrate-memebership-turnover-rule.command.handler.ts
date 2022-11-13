import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { MigrateMembershipTurnoverRulePriceIdCommand } from '@membership/commands/impl';
import { MembershipTurnoverRule } from '@membership/entities';
import { MembershipTurnoverRuleRepository } from '@membership/repository';

@CommandHandler(MigrateMembershipTurnoverRulePriceIdCommand)
export class MigrateMembershipTurnoverRulePriceIdCommandHandler
  implements ICommandHandler<MigrateMembershipTurnoverRulePriceIdCommand>
{
  constructor(private readonly repo: MembershipTurnoverRuleRepository) {}

  execute({
    id,
    priceId,
  }: MigrateMembershipTurnoverRulePriceIdCommand): Promise<MembershipTurnoverRule> {
    console.log('migrate');
    return this.repo.update(id, { priceId });
  }
}
