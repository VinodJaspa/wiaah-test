import { OrderStatusEnum } from '@prisma-client';

export class GetBuyerOrdersQuery {
  constructor(
    public readonly buyerId: string,
    public readonly statusFilter?: OrderStatusEnum,
  ) {}
}
