import { Category } from '@category';
import {
  ObjectType,
  Field,
  Int,
  ID,
  Directive,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import {
  CashbackType,
  PresentationType,
  ProductCondition,
  ProductStatus,
  ProductUsageStatus,
  VisibilityEnum,
} from '@prisma-client';
import { ShippingDetails } from '@products/entities/extends';
import { CreateGqlPaginatedResponse } from 'nest-utils';

registerEnumType(VisibilityEnum, { name: 'VisibilityEnum' });
registerEnumType(ProductUsageStatus, { name: 'ProductUsageStatus' });
registerEnumType(ProductCondition, { name: 'ProductCondition' });

@ObjectType()
export class ProductPresentation {
  @Field((type) => PresentationType)
  type: PresentationType;

  @Field((type) => String)
  src: string;
}

@ObjectType()
@Directive('@key(fields:"id")')
export class Cashback {
  @Field(() => ID)
  id: string;

  @Field((type) => Int)
  units: number;

  @Field((type) => Int)
  amount: number;

  @Field((type) => CashbackType)
  type: CashbackType;
}

@ObjectType()
@Directive('@key(fields:"id")')
export class Discount {
  @Field(() => ID)
  id: string;

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
export class Product {
  @Field((type) => ID)
  id: string;

  @Field(() => ID)
  sellerId: string;

  @Field(() => String)
  vendor_external_link: string;

  @Field(() => String, { nullable: true })
  todayProductClickId?: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  description: string;

  @Field(() => [String])
  hashtags: string[];

  @Field(() => ID)
  categoryId: string;

  @Field((type) => Category, { nullable: true })
  category?: Category;

  @Field(() => [ProductAttribute])
  attributes: ProductAttribute[];

  @Field((type) => Int)
  stock: number;

  @Field((type) => String, { nullable: true })
  discountId?: string;

  @Field((type) => String, { nullable: true })
  cashbackId?: string;

  @Field((type) => [ProductPresentation])
  presentations: ProductPresentation[];

  @Field(() => String)
  thumbnail: string;

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

  @Field(() => ShippingDetails, { nullable: true })
  shippingDetails?: ShippingDetails;

  @Field(() => Int)
  reviews: number;

  @Field(() => Int)
  sales: number;

  @Field(() => Int)
  totalOrdered: number;

  @Field(() => Int)
  totalDiscounted: number;

  @Field(() => Int)
  totalDiscountedAmount: number;

  @Field(() => Int)
  unitsRefunded: number;

  @Field(() => Int)
  positiveFeedback: number;

  @Field(() => Int)
  negitiveFeedback: number;

  @Field(() => Float)
  vat: number;

  @Field(() => ProductStatus)
  status: ProductStatus;

  @Field(() => ProductUsageStatus)
  usageStatus: ProductUsageStatus;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;

  @Field(() => Float)
  earnings: number;

  @Field(() => ProductCondition)
  condition: ProductCondition;

  rateStarCount: number;
}

@ObjectType()
export class ProductSearchPaginationResponse extends CreateGqlPaginatedResponse(
  Product,
) {}
