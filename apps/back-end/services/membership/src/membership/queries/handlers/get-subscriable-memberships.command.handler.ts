import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Membership } from '../../entities';
import { MembershipRepository } from '../../repository';
import { GetSubscriableMembershipsQuery } from '../impl';

@CommandHandler(GetSubscriableMembershipsQuery)
export class GetSubscriableMemberShipsQueryHandler
  implements ICommandHandler<GetSubscriableMembershipsQuery>
{
  constructor(private readonly repo: MembershipRepository) {}

  execute(): Promise<Membership[]> {
    return this.repo.findAllActive();
  }
}
