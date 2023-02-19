export class CreateAffiliationPurchaseInput {
  itemId: string;
  itemType: string;
  affiliatorId: string;
  affiliationId: string;
  purchaserId: string;
  sellerId: string;
  paidCommissionPercent: number;
  paidCommissionAmount: number;
}
