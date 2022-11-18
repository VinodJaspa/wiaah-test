import { OrderStatusEnum } from '@prisma-client';

export class GetSellerOrdersQuery {
  constructor(
    public readonly sellerId: string,
    public readonly statusFilter?: OrderStatusEnum,
  ) {}
}
