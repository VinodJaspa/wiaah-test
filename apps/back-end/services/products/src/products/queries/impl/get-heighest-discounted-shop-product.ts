export class GetHeighestDiscountedShopProduct {
  constructor(public id: string) {}
}

export type GetHeighestDiscountedShopProductRes = {
  id: string;
  percent: number;
};
