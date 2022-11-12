import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { MembershipModifedEvent } from '../../events';
import { Membership } from '../../entities';
import { MembershipRepository } from '../../repository';
import { UpdateMembershipCommand } from '../impl';

@CommandHandler(UpdateMembershipCommand)
export class UpdateMembershipCommandHandler
  implements ICommandHandler<UpdateMembershipCommand>
{
  constructor(
    private readonly repo: MembershipRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ input, user }: UpdateMembershipCommand): Promise<Membership> {
    const res = await this.repo.update(input.id, input);
    this.eventBus.publish(new MembershipModifedEvent(res, user));
    return res;
  }
}
