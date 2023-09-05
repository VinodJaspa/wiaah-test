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
  ProductAttributeDisplayType,
  ProductAttributeSelectionType,
  ProductCondition,
  ProductSize,
  ProductStatus,
  VisibilityEnum,
} from '@prisma-client';
import { ShippingDetails } from '@products/entities/extends';
import { TranslationText } from '@shop';
import {
  CreateGqlCursorPaginatedResponse,
  CreateGqlPaginatedResponse,
} from 'nest-utils';

registerEnumType(VisibilityEnum, { name: 'VisibilityEnum' });
registerEnumType(ProductCondition, { name: 'ProductCondition' });
registerEnumType(ProductAttributeSelectionType, {
  name: 'ProductAttributeSelectionType',
});
registerEnumType(ProductAttributeDisplayType, {
  name: 'ProductAttributeDisplayType',
});

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
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: String;

  @Field(() => [ProductAttributeValue])
  values: ProductAttributeValue[];

  @Field(() => ProductAttributeSelectionType)
  selectionType: ProductAttributeSelectionType;

  @Field(() => ProductAttributeDisplayType)
  displayType: ProductAttributeDisplayType;
}

@ObjectType()
export class ProductRawAttribute {
  @Field(() => ID)
  id: string;

  @Field(() => [TranslationText])
  name: TranslationText[];

  @Field(() => [ProductRawAttributeValue])
  values: ProductRawAttributeValue[];

  @Field(() => ProductAttributeSelectionType)
  selectionType: ProductAttributeSelectionType;

  @Field(() => ProductAttributeDisplayType)
  displayType: ProductAttributeDisplayType;
}

@ObjectType()
export class ProductRawAttributeValue {
  @Field(() => String)
  value: string;

  @Field(() => [TranslationText])
  name: TranslationText[];
}

@ObjectType()
export class ProductAttributeValue {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  value: string;

  @Field(() => String)
  name: string;
}

@ObjectType()
@Directive('@key(fields: "id")')
@Directive('@key(fields: "sellerId")')
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

  @Field(() => [ProductSelectAttribute])
  selectableAttributes: ProductSelectAttribute[];

  @Field((type) => Int)
  stock: number;

  @Field((type) => String, { nullable: true })
  discountId?: string;

  @Field((type) => String, { nullable: true })
  cashbackId?: string;

  @Field((type) => [ProductPresentation])
  presentations: ProductPresentation[];

  @Field(() => [ProductSize])
  sizes: ProductSize[];

  @Field(() => [String])
  colors: string[];

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
export class ProductSelectAttribute {
  @Field(() => ID)
  id: string;

  @Field(() => [ID])
  values: string[];
}

@ObjectType()
export class ProductPaginationResponse extends CreateGqlPaginatedResponse(
  Product,
) {}
@ObjectType()
export class ProductSearchPaginationResponse extends CreateGqlPaginatedResponse(
  Product,
) {}

@ObjectType()
export class ProductsCursorPaginationResponse extends CreateGqlCursorPaginatedResponse(
  Product,
) {}
