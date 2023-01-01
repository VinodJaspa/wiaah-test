import { OrderStatusEnum } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

export class GetBuyerOrdersQuery {
  constructor(
    public readonly buyerId: string,
    public readonly pagination: GqlPaginationInput,
    public readonly statusFilter?: OrderStatusEnum,
    public readonly q?: string,
  ) {}
}
