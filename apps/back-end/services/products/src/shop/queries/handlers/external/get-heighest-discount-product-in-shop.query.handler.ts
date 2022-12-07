import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import {
  GetHeighestDiscountedShopProduct,
  GetHeighestDiscountedShopProductRes,
} from '@products/queries';
import {
  GetHeighestDiscountProductInShopQuery,
  GetHeighstDiscountProductInShopQueryRes,
} from '@shop/queries/impl';

@QueryHandler(GetHeighestDiscountProductInShopQuery)
export class GetHeighestDiscountProductInShopQueryHandler
  implements IQueryHandler<GetHeighestDiscountProductInShopQuery>
{
  constructor(private readonly querybus: QueryBus) {}
  async execute({
    id,
  }: GetHeighestDiscountProductInShopQuery): Promise<GetHeighstDiscountProductInShopQueryRes> {
    const res = await this.querybus.execute<
      GetHeighestDiscountedShopProduct,
      GetHeighestDiscountedShopProductRes
    >(new GetHeighestDiscountedShopProduct(id));

    return {
      percent: res.percent,
      productId: res.id,
      shopId: id,
    };
  }
}
