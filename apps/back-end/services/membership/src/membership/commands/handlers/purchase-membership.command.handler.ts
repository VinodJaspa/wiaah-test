import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MembershipRepository } from '../../repository';
import { PurchaseMembershipCommand } from '../impl';

@CommandHandler(PurchaseMembershipCommand)
export class PurchaseMembershipCommandHandler
  implements ICommandHandler<PurchaseMembershipCommand>
{
  constructor(private readonly repo: MembershipRepository) {}

  async execute({ input, user }: PurchaseMembershipCommand): Promise<boolean> {
    const membership = await this.repo.findById(input.memberShipId);
    return true;
  }
}
