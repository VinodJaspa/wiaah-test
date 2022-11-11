import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { MembershipCreatedEvent } from '../../events';
import { Membership } from '../../entities';
import { MembershipRepository } from '../../repository';
import { CreateMembershipCommand } from '../impl';

@CommandHandler(CreateMembershipCommand)
export class CreateMembershipCommandHandler
  implements ICommandHandler<CreateMembershipCommand>
{
  constructor(
    private readonly repo: MembershipRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ input, user }: CreateMembershipCommand): Promise<Membership> {
    const res = await this.repo.create(input, user.id);
    this.eventBus.publish(new MembershipCreatedEvent(res, user));
    return res;
  }
}
