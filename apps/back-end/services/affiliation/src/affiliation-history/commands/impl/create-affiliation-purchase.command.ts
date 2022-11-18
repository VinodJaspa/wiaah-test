import { CreateAffiliationPurchaseInput } from '@affiliation-history/dto';

export class CreateAffiliationPurchaseCommand {
  constructor(public readonly input: CreateAffiliationPurchaseInput) {}
}
