import {
  CommandBus,
  CommandHandler,
  EventBus,
  ICommandHandler,
} from '@nestjs/cqrs';

import { MembershipModifedEvent } from '@membership/events';
import { Membership, MembershipTurnoverRule } from '@membership/entities';
import { MembershipRepository } from '@membership/repository';
import {
  UpdateMembershipCommand,
  UpdateMembershipTurnoverRuleCommand,
} from '@membership/commands/impl';

@CommandHandler(UpdateMembershipCommand)
export class UpdateMembershipCommandHandler
  implements ICommandHandler<UpdateMembershipCommand>
{
  constructor(
    private readonly membershipRepo: MembershipRepository,
    private readonly eventBus: EventBus,
    private readonly commandbus: CommandBus,
  ) {}

  async execute({
    input: { id, ...rest },
    user,
  }: UpdateMembershipCommand): Promise<Membership> {
    const res = await this.membershipRepo.update(id, {
      ...rest,
      turnover_rules: undefined,
    });

    const promises = rest.turnover_rules.map((v) =>
      this.commandbus.execute<
        UpdateMembershipTurnoverRuleCommand,
        MembershipTurnoverRule
      >(new UpdateMembershipTurnoverRuleCommand(v, user)),
    );

    await Promise.all(promises);
    this.eventBus.publish(new MembershipModifedEvent(res, user));
    return res;
  }
}
