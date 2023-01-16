import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { ProductCategoryStatus } from '@prisma-client';

registerEnumType(ProductCategoryStatus, { name: 'ProductCategoryStatus' });

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  sortOrder: number;

  @Field(() => ProductCategoryStatus)
  status: ProductCategoryStatus;

  @Field(() => ID)
  parantId: string;
}
