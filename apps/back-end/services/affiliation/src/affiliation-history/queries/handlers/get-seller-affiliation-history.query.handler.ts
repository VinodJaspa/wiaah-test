import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSellerAffiliationHistoryQuery } from '@affiliation-history/queries/impl';
import { AffiliationPurchase } from '@affiliation-history/entities';
import { AffiliationPurchaseRepository } from '@affiliation-history/repository';

@QueryHandler(GetSellerAffiliationHistoryQuery)
export class GetSellerAffiliationHistoryQueryHandler
  implements ICommandHandler<GetSellerAffiliationHistoryQuery>
{
  constructor(private readonly repo: AffiliationPurchaseRepository) {}

  async execute({
    sellerId,
  }: GetSellerAffiliationHistoryQuery): Promise<AffiliationPurchase[]> {
    const res = await this.repo.getAllBySellerId(sellerId);

    return res;
  }
}
