import { Field, Float, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { ProductStatus } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

class input {
  @Field(() => String)
  title: string;

  @Field(() => String)
  seller: string;

  @Field(() => ID)
  productId: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  qty: number;

  @Field(() => ProductStatus)
  status: ProductStatus;

  @Field(() => String)
  updatedAt: string;
}

@InputType()
export class GetFilteredProductsAdminInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
