import { AffiliationPurchase } from '@affiliation-history/entities';
import { GetFilteredAffiliationHistoryInput } from '@affiliation-history/dto';

export class GetFilteredAffiliationsQuery {
  constructor(public input: GetFilteredAffiliationHistoryInput) {}
}

export type GetFilteredAffiliationsQueryRes = AffiliationPurchase[];
