import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Product } from '@products/entities';
import { GetSellerProductsQuery } from '@products/queries/impl';
import { ProductRepository } from '@products/repository';

@QueryHandler(GetSellerProductsQuery)
export class GetSellerProductsQueryHandler
  implements IQueryHandler<GetSellerProductsQuery>
{
  constructor(private readonly repo: ProductRepository) {}

  async execute({
    sellerId,
    lang,
  }: GetSellerProductsQuery): Promise<Product[]> {
    const res = await this.repo.findAllBySellerId(sellerId);

    return res.map((v) => this.repo.formatProduct(v, lang));
  }
}
