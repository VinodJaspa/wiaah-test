import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  IncreamentUserSalesCommand,
  IncreamentUserSalesCommandRes,
} from '@accounts/commands';
import { AccountRepository } from '@accounts/repository';

@CommandHandler(IncreamentUserSalesCommand)
export class IncreamentUserSalesCommandHandler
  implements ICommandHandler<IncreamentUserSalesCommand>
{
  constructor(private repo: AccountRepository) {}

  async execute({
    amount,
    userId,
  }: IncreamentUserSalesCommand): Promise<IncreamentUserSalesCommandRes> {
    const res = await this.repo.updateAccount(userId, {
      sales: {
        increment: amount,
      },
    });

    return res;
  }
}
