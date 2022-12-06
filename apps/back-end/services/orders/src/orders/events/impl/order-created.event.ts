import { Order } from '@prisma-client';

export class OrderCreatedEvent {
  constructor(
    public readonly order: Order,
    public readonly payment: { type: string; value: string },
  ) {}
}
