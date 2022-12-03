import { RefundRequest } from '@prisma-client';

export class RefundRequestCreatedEvent {
  constructor(public readonly refund: RefundRequest) {}
}
