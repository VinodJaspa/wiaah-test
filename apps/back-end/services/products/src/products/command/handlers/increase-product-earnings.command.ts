import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IncreaseProductEarningsCommand } from '@products/command/impl';
import { Product } from '@products/entities';
import { ProductRepository } from '@products/repository';

@CommandHandler(IncreaseProductEarningsCommand)
export class IncreaseProductEarningsCommandHandler
  implements ICommandHandler<IncreaseProductEarningsCommand>
{
  constructor(private readonly repo: ProductRepository) {}

  async execute({
    earning,
    productId,
  }: IncreaseProductEarningsCommand): Promise<Product> {
    const res = await this.repo.update(productId, {
      earnings: {
        increment: earning,
      },
    });

    return res;
  }
}
