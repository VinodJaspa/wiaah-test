import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CreateAffiliationCommand } from '@affiliation/commands/impl';
import { Affiliation } from '@affiliation/entities';
import { AffiliationRepository } from '@affiliation/repository';
import { GetAffiliationItemSellerIdQuery } from '@affiliation/queries';
import { UnauthorizedException } from '@nestjs/common';

@CommandHandler(CreateAffiliationCommand)
export class CreateAffiliationCommandHandler
  implements ICommandHandler<CreateAffiliationCommand>
{
  constructor(
    private readonly repo: AffiliationRepository,
    private readonly querybus: QueryBus,
  ) {}

  async execute({
    input,
    sellerId,
  }: CreateAffiliationCommand): Promise<Affiliation> {
    const itemSellerId =
      await this.querybus.execute<GetAffiliationItemSellerIdQuery>(
        new GetAffiliationItemSellerIdQuery(input.itemId, input.itemType),
      );
    if (itemSellerId !== sellerId) throw new UnauthorizedException();

    const res = await this.repo.create(input, sellerId);

    return res;
  }
}
