import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { UpdateUserMembershipCommand } from '@accounts/commands/impl';
import { AccountRepository } from '@accounts/repository';
import { Account } from '@entities';
import { UserMembershipUpdatedEvent } from '@accounts/events';

@CommandHandler(UpdateUserMembershipCommand)
export class UpdateUserMembershipCommandHandler
  implements ICommandHandler<UpdateUserMembershipCommand>
{
  constructor(
    private readonly accountsRepo: AccountRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    membershipId,
    userId,
  }: UpdateUserMembershipCommand): Promise<Account> {
    const res = await this.accountsRepo.updateAccount(userId, { membershipId });
    console.log(res);
    this.eventBus.publish(
      new UserMembershipUpdatedEvent(res.id, res.membershipId),
    );
    return res;
  }
}
