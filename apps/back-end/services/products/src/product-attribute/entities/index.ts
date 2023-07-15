import { ObjectType } from '@nestjs/graphql';
import { ProductAttribute } from '@products';
import { CreateGqlPaginatedResponse } from 'nest-utils';

@ObjectType()
export class ProductAttributesPaginationResponse extends CreateGqlPaginatedResponse(
  ProductAttribute,
) {}
