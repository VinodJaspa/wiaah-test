import { RefundRequest } from '@prisma-client';

export class RefundRequestRejectedEvent {
  constructor(public refund: RefundRequest) {}
}
