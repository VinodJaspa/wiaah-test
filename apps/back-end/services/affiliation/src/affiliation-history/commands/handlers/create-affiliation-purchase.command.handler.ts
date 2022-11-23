import { AffiliationPurchase } from '@affiliation-history/entities';
import { AffiliationPurchaseRepository } from '@affiliation-history/repository';
import { CreateAffiliationPurchaseCommand } from '@affiliation-history/commands';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateAffiliationPurchaseCommand)
export class CreateAffiliationPurchaseCommandHandler
  implements ICommandHandler<CreateAffiliationPurchaseCommand>
{
  constructor(private readonly repo: AffiliationPurchaseRepository) {}

  async execute({
    input,
  }: CreateAffiliationPurchaseCommand): Promise<AffiliationPurchase> {
    const res = await this.repo.create(input);
    return res;
  }
}
