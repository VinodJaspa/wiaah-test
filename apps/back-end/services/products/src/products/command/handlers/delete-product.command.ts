import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '@products/command/impl';
import { Product } from '@products/entities';
import { ProductRepository } from '@products/repository';

@CommandHandler(DeleteProductCommand)
export class DeleteProductsCommandHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(private readonly repo: ProductRepository) {}

  async execute({ productId, userId }: DeleteProductCommand): Promise<Product> {
    const res = await this.repo.getProduct(productId);
    if (!res) throw new NotFoundException('product not found');

    if (res.sellerId !== userId)
      throw new UnauthorizedException('you cannot delete someone else product');

    const deleted = await this.repo.deleteProduct(productId);
    return deleted;
  }
}
