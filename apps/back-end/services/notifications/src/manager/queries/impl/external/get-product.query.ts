export class GetProductQuery {
  constructor(public productId: string) {}
}

export type GetProductQueryRes = {
  title: string;
};
