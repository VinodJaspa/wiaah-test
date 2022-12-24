import { GqlPaginationInput } from 'nest-utils';

export class GetUserIdsByNameQuery {
  constructor(public name: string, public pagination: GqlPaginationInput) {}
}

export type GetUserIdsByNameQueryRes = {
  ids: string[];
};
