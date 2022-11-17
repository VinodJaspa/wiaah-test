import { GqlPaginationInput } from 'nest-utils';

export class GetSellerProductsQuery {
  constructor(public sellerId: string, public pagination: GqlPaginationInput) {}
}
