import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Membership } from '../../entities';
import { MembershipRepository } from '../../repository';
import { UpdateMembershipCommand } from '../impl';

@CommandHandler(UpdateMembershipCommand)
export class UpdateMembershipCommandHandler
  implements ICommandHandler<UpdateMembershipCommand>
{
  constructor(private readonly repo: MembershipRepository) {}

  async execute({ input, user }: UpdateMembershipCommand): Promise<Membership> {
    const res = await this.repo.update(input, user.id);

    return res;
  }
}
