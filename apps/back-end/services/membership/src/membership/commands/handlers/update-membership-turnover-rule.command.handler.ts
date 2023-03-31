import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMembershipTurnoverRuleCommand } from '@membership/commands/impl';
import { MembershipTurnoverRule } from '@membership/entities';
import { MembershipTurnoverRuleRepository } from '@membership/repository';

@CommandHandler(UpdateMembershipTurnoverRuleCommand)
export class UpdateMembershipTurnoverRuleCommandHander
  implements ICommandHandler<UpdateMembershipTurnoverRuleCommand>
{
  constructor(private readonly repo: MembershipTurnoverRuleRepository) {}

  async execute({
    input: { id, ...rest },
    user,
  }: UpdateMembershipTurnoverRuleCommand): Promise<MembershipTurnoverRule> {
    console.log('updateing', { id, rest });
    const res = await this.repo.update(id, { ...rest });
    return res;
  }
}
