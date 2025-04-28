import { AccountRepository } from '@accounts/repository';
import { Account } from '@entities';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IncreamentUserProductsCount } from '../impl/increment-user-products-count.command';

@CommandHandler(IncreamentUserProductsCount)
export class IncreamentUserProductsCountHandler
  implements ICommandHandler<IncreamentUserProductsCount>
{
  constructor(private readonly repo: AccountRepository) {}

  async execute({
    products,
    userId,
  }: IncreamentUserProductsCount): Promise<Account> {
    const account = await this.repo.findAccount(userId); // Assuming findOne fetches account by userId
    const updatedProducts = [...account.products, ...products]; // assuming `products` is an array of strings
    const res = await this.repo.updateAccount(userId, {
      products: updatedProducts,
    });
    return res;
  }
}
