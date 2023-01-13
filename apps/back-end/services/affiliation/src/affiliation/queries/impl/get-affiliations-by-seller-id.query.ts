import { GqlPaginationInput } from 'nest-utils';

export class GetAffliationsBySellerIdQuery {
  constructor(
    public readonly sellerId: string,
    public readonly pagination: GqlPaginationInput,
  ) {}
}
