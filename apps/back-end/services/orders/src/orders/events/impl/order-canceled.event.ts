import { Order, OrderItem } from '@prisma-client';

export class OrderCanceledEvent {
  constructor(public readonly order: Order & { items: OrderItem[] }) {}
}
