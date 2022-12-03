import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { MembershipRepository } from '../../repository';
import { Membership } from '../../entities';
import { GetMembershipPlanByIdQuery } from '../impl';

@QueryHandler(GetMembershipPlanByIdQuery)
export class GetMembershipPlanByIdQueryHandler
  implements IQueryHandler<GetMembershipPlanByIdQuery>
{
  constructor(private readonly repo: MembershipRepository) {}

  execute({ planId }: GetMembershipPlanByIdQuery): Promise<Membership | null> {
    if (!planId) return null;
    return this.repo.findById(planId);
  }
}
