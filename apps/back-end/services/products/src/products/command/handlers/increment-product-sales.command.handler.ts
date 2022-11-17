import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Product } from '@products/entities';
import { ProductRepository } from '@products/repository';
import { IncrementProductSalesCommand } from '../impl';

@CommandHandler(IncrementProductSalesCommand)
export class IncrementProductSalesCommandHandler
  implements ICommandHandler<IncrementProductSalesCommand>
{
  constructor(private readonly repo: ProductRepository) {}

  async execute({ productId }: IncrementProductSalesCommand): Promise<Product> {
    const res = await this.repo.update(productId, {
      sales: {
        increment: 1,
      },
    });

    return res;
  }
}
