export class GetProductsData {
  constructor(public readonly ids: string[]) {}
}

export type GetProductsDataRes =
  | {
      id: string;
      sellerId: string;
      title: string;
      thumbnail: string;
      price: number;
      tax: number;
      categories: string[];
    }[]
  | null;
