import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAccountVerificationRequestsQuery } from '@acc-verification/queries/impl';
import { AccountVerificationRepository } from '@acc-verification/repository';
import { AccountVerification } from '@acc-verification/entities';

@QueryHandler(GetAccountVerificationRequestsQuery)
export class GetAccountVerificationRequestsQueryHandler
  implements IQueryHandler<GetAccountVerificationRequestsQuery>
{
  constructor(private readonly repo: AccountVerificationRepository) {}

  async execute(
    query: GetAccountVerificationRequestsQuery,
  ): Promise<AccountVerification[]> {
    const res = await this.repo.getAllCompleted();

    return res;
  }
}
