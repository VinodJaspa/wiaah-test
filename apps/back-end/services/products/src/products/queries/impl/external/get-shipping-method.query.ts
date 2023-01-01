export class GetShippingMethodQuery {
  constructor(public readonly id: string) {}
}
export type ShippingMethodQueryRes = {
  cost: number;
  name: string;
};
