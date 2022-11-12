import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';

import { Membership } from '@membership/entities';
import { MembershipRepository } from '@membership/repository';
import { GetSubscriableMembershipsQuery } from '@membership/queries/impl';

@QueryHandler(GetSubscriableMembershipsQuery)
export class GetSubscriableMemberShipsQueryHandler
  implements ICommandHandler<GetSubscriableMembershipsQuery>
{
  constructor(private readonly repo: MembershipRepository) {}

  execute(): Promise<Membership[]> {
    return this.repo.findAll();
  }
}
