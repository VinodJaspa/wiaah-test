import { Field, Float, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { ProdcutType, ProductStatus, ProductUsageStatus } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
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

  @Field(() => ProdcutType)
  type: ProdcutType;

  @Field(() => ProductUsageStatus)
  usageStatus: ProductUsageStatus;
}

@InputType()
export class GetFilteredProductsAdminInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}

@InputType()
export class ProductFilteredInput {
  @Field(() => [ID])
  categories: string[];

  @Field(() => Float)
  minPrice: number;

  @Field(() => Float)
  maxPrice: number;

  @Field(() => [ID])
  brands: string[];

  @Field(() => [Int])
  ratings: number[];

  @Field(() => [String])
  colors: string[];

  @Field(() => [String])
  size: string[];

  @Field(() => Boolean)
  inStock: boolean;

  @Field(() => ProductUsageStatus)
  usageStatus: ProductUsageStatus;

  @Field(() => ProdcutType)
  type: ProdcutType;
}

@InputType()
export class GetFilteredProductsInput extends PartialType(
  ProductFilteredInput,
) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}

@InputType()
export class AdminGetAccountProductsInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => ID)
  accountId: string;
}

@InputType()
export class GetSellerProductsInput {
  @Field(() => String)
  sellerId: string;

  @Field(() => String, { nullable: true })
  idCursor?: string;

  @Field(() => Int)
  take: number;
}
