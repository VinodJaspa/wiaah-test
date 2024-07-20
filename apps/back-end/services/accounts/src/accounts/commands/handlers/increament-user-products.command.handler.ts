import { AccountRepository } from '@accounts/repository';
import { Account } from '@entities';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IncreamentUserProductsCount } from '../impl/increment-user-products-count.command';

@CommandHandler(IncreamentUserProductsCount)
export class IncreamentUserProductsCountHandler
  implements ICommandHandler<IncreamentUserProductsCount>
{
  constructor(private readonly repo: AccountRepository) { }

  async execute({
    amount,
    userId,
  }: IncreamentUserProductsCount): Promise<Account> {
    const res = await this.repo.updateAccount(userId, {
      products: {
        increment: amount,
      },
    });
    return res;
  }
}
