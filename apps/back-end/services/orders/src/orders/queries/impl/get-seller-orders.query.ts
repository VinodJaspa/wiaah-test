import { OrderStatusEnum } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

export class GetSellerOrdersQuery {
  constructor(
    public readonly sellerId: string,
    public readonly pagination: GqlPaginationInput,
    public readonly statusFilter?: OrderStatusEnum,
    public readonly q?: string,
  ) {}
}
