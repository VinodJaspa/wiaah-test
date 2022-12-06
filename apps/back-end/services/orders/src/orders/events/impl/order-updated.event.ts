import { Order } from '@prisma-client';

export class OrderUpdatedEvent {
  constructor(public order: Order) {}
}
