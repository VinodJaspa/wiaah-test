import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { ProductCategoryStatus } from '@prisma-client';
import { CreateGqlCursorPaginatedResponse } from 'nest-utils';

registerEnumType(ProductCategoryStatus, { name: 'ProductCategoryStatus' });

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => Int)
  sales: number;

  @Field(() => ProductCategoryStatus)
  status: ProductCategoryStatus;

  @Field(() => ID, { nullable: true })
  parantId?: string;
}

@ObjectType()
export class CategoryCursorResponse extends CreateGqlCursorPaginatedResponse(
  Category,
) {}
