import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAffliationsBySellerIdQuery } from '@affiliation/queries/impl';
import { AffiliationRepository } from '@affiliation/repository';
import { Affiliation } from '@affiliation/entities';

@QueryHandler(GetAffliationsBySellerIdQuery)
export class GetAffliationsBySellerIdQueryHandler
  implements IQueryHandler<GetAffliationsBySellerIdQuery>
{
  constructor(private readonly repo: AffiliationRepository) {}

  async execute({
    sellerId,
  }: GetAffliationsBySellerIdQuery): Promise<Affiliation[]> {
    const res = await this.repo.getAllByUserId(sellerId);
    return res;
  }
}
