export class CreateOrderCommand {
  constructor(
    public readonly buyerId: string,
    public readonly sellerId: string,
    public readonly orderItems: {
      id: string;
      qty: number;
      type: string;
      discountId: string;
      affiliationId: string;
    }[],
    public readonly shippingMethodId: string,
    public readonly shippingAddressId: string,
  ) {}
}
