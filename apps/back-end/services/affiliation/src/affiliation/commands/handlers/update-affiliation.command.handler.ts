import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAffiliationCommand } from '@affiliation/commands/impl';
import { Affiliation } from '@affiliation/entities';
import { AffiliationRepository } from '@affiliation/repository';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AddToDate } from 'nest-utils';

@CommandHandler(UpdateAffiliationCommand)
export class UpdateAffiliationCommandHandler
  implements ICommandHandler<UpdateAffiliationCommand>
{
  constructor(private readonly repo: AffiliationRepository) {}

  async execute({
    input: { id, validFor, ...rest },
    sellerId,
  }: UpdateAffiliationCommand): Promise<Affiliation> {
    const aff = await this.repo.getOneById(id);
    if (!aff) throw new NotFoundException();
    if (aff.sellerId !== sellerId) throw new UnauthorizedException();

    const res = await this.repo.update(id, {
      ...rest,
      expireAt: AddToDate(aff.createdAt, { days: validFor }),
    });

    return res;
  }
}
