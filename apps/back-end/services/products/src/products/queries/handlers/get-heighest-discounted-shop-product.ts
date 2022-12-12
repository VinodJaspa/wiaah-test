import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetHeighestDiscountedShopProduct,
  GetHeighestDiscountedShopProductRes,
} from '@products/queries/impl';
import { ProductRepository } from '@products/repository';

@QueryHandler(GetHeighestDiscountedShopProduct)
export class GetHeighestDiscountedShopProductHandler
  implements IQueryHandler<GetHeighestDiscountedShopProduct>
{
  constructor(private repo: ProductRepository) {}

  async execute({
    id,
  }: GetHeighestDiscountedShopProduct): Promise<GetHeighestDiscountedShopProductRes> {
    const res = await this.repo.getTopDiscountedByShop(id);

    return {
      id: res.id,
      percent: res.discount.amount,
    };
  }
}
