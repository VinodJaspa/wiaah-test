export class GetShippingAddressQuery {
  constructor(public readonly id: string) {}
}
export type ShippingAddressQueryRes = {
  address_full: string;
  country: string;
  state: string;
  city: string;
  address: string;
  coords: {
    lat: number;
    long: number;
  };
  ownerId: string;
};
