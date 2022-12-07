export class GetHeighestDiscountProductInShopQuery {
  constructor(public id: string) {}
}

export type GetHeighstDiscountProductInShopQueryRes = {
  shopId: string;
  productId: string;
  percent: number;
};
