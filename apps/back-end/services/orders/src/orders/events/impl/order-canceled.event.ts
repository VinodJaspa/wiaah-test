import { Order } from '@prisma-client';

export class OrderCanceledEvent {
  constructor(public readonly order: Order) {}
}
