import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Membership } from '../../entities';

import { MembershipRepository } from '../../repository';
import { CreateMembershipCommand } from '../impl';

@CommandHandler(CreateMembershipCommand)
export class CreateMembershipCommandHandler
  implements ICommandHandler<CreateMembershipCommand>
{
  constructor(private readonly repo: MembershipRepository) {}

  async execute({ input, user }: CreateMembershipCommand): Promise<Membership> {
    const res = await this.repo.create(input, user.id);
    return res;
  }
}
