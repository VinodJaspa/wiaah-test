import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { MembershipCreatedEvent } from '@membership/events';
import { Membership } from '@membership/entities';
import { MembershipRepository } from '@membership/repository';
import { CreateMembershipCommand } from '@membership/commands/impl';

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
