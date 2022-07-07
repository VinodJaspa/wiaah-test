import { ObjectType } from '@nestjs/graphql';
import { PaginationData } from 'nest-utils';
import { Partner } from '@entities';

@ObjectType()
export class PaginatedPartners extends PaginationData {
  data: Partner[];
}
