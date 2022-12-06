export class CreateOrderCommand {
  constructor(
    public readonly buyerId: string,
    public readonly sellerId: string,
    public readonly orderItems: { id: string; qty: number; type: string }[],
    public readonly shippingMethodId: string,
    public readonly shippingAddressId?: String,
  ) {}
}
