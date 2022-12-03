import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAffiliationCommand } from '@affiliation/commands/impl';
import { Affiliation } from '@affiliation/entities';
import { AffiliationRepository } from '@affiliation/repository';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

@CommandHandler(DeleteAffiliationCommand)
export class DeleteAffiliationCommandHandler
  implements ICommandHandler<DeleteAffiliationCommand>
{
  constructor(private readonly repo: AffiliationRepository) {}

  async execute({
    id,
    userId,
  }: DeleteAffiliationCommand): Promise<Affiliation> {
    const aff = await this.repo.getOneById(id);
    if (!aff) throw new NotFoundException();
    if (aff.sellerId !== userId) throw new UnauthorizedException();

    const res = await this.repo.deleteOne(id);

    return res;
  }
}
