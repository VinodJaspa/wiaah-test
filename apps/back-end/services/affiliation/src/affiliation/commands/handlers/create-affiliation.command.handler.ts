import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CreateAffiliationPurchaseCommand } from '@affiliation/commands/impl';
import { Affiliation } from '@affiliation/entities';
import { AffiliationRepository } from '@affiliation/repository';
import { GetAffiliationItemSellerIdQuery } from '@affiliation/queries';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(CreateAffiliationPurchaseCommand)
export class CreateAffiliationCommandHandler
  implements ICommandHandler<CreateAffiliationPurchaseCommand>
{
  constructor(
    private readonly repo: AffiliationRepository,
    private readonly querybus: QueryBus,
  ) {}

  async execute({
    input,
    sellerId,
  }: CreateAffiliationPurchaseCommand): Promise<Affiliation> {
    const itemSellerId =
      await this.querybus.execute<GetAffiliationItemSellerIdQuery>(
        new GetAffiliationItemSellerIdQuery(input.itemId, input.itemType),
      );
    if (itemSellerId !== sellerId) throw new UnauthorizedException();

    const res = await this.repo.create(input, sellerId);

    return res;
  }
}
