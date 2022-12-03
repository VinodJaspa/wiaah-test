import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Product } from '@products/entities';
import { GetSellerProductsQuery } from '@products/queries/impl';
import { ProductRepository } from '@products/repository';

@QueryHandler(GetSellerProductsQuery)
export class GetSellerProductsQueryHandler
  implements IQueryHandler<GetSellerProductsQuery>
{
  constructor(private readonly repo: ProductRepository) {}

  async execute({ sellerId }: GetSellerProductsQuery): Promise<Product[]> {
    return this.repo.findAllBySellerId(sellerId);
  }
}
