import {
  ObjectType,
  Field,
  Int,
  ID,
  Directive,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { CashbackType, PresentationType, VisibilityEnum } from '@prisma-client';
import { CreateGqlPaginatedResponse } from 'nest-utils';

registerEnumType(VisibilityEnum, { name: 'VisibilityEnum' });

@ObjectType()
export class ProductPresentation {
  @Field((type) => PresentationType)
  type: PresentationType;

  @Field((type) => String)
  src: string;
}

@ObjectType()
export class CashBack {
  @Field((type) => Int)
  units: number;

  @Field((type) => Int)
  amount: number;

  @Field((type) => CashbackType)
  type: CashbackType;
}

@ObjectType()
export class Discount {
  @Field((type) => Int)
  units: number;

  @Field((type) => Int)
  amount: number;
}

@ObjectType()
export class ProductAttribute {
  @Field(() => String)
  name: string;

  @Field(() => [String])
  values: string[];
}

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@key(fields: "shopId")')
export class Product {
  @Field((type) => ID)
  id: string;

  @Field(() => ID)
  sellerId: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  description: string;

  @Field((type) => ID)
  shopId: string;

  @Field(() => [String])
  hostCategories: string[];

  @Field((type) => String)
  category: string;

  @Field(() => [ProductAttribute])
  attributes: ProductAttribute[];

  @Field((type) => Int)
  stock: number;

  @Field((type) => Discount)
  discount: Discount;

  @Field((type) => CashBack)
  cashback: CashBack;

  @Field((type) => [ProductPresentation])
  presentations: ProductPresentation[];

  @Field((type) => Int)
  rate: number;

  @Field((type) => String)
  brand: string;

  @Field((type) => Float)
  price: number;

  @Field((type) => VisibilityEnum)
  visibility: VisibilityEnum;

  @Field((type) => [ID])
  shippingRulesIds: string[];

  @Field(() => Int)
  reviews: number;

  rateStarCount: number;
}

@ObjectType()
export class ProductSearchPaginationResponse extends CreateGqlPaginatedResponse(
  Product,
) {}
