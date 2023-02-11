import { Order, OrderItem } from '@prisma-client';

export class OrderCreatedEvent {
  constructor(
    public readonly order: Order & { items: OrderItem[] },
    public readonly payment: { type: string; value: string },
  ) {}
}
