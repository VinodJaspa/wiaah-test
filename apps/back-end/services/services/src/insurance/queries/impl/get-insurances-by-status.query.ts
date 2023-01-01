import { Insurance } from '@insurance/entities';
import { GqlPaginationInput } from 'nest-utils';
import { ServiceInsuranceStatusEnum } from 'prismaClient';

export class GetInsurancesByStatusQuery {
  constructor(
    public status: ServiceInsuranceStatusEnum,
    public pagination: GqlPaginationInput,
  ) {}
}

export type GetInsurancesByStatusQueryRes = Insurance[];
