import {
  InputType,
  Int,
  Field,
  registerEnumType,
  Float,
  ID,
} from '@nestjs/graphql';
import {
  CashbackType,
  PresentationType,
  ProdcutType,
  ProductCondition,
  ProductSize,
  ProductStatus,
  VisibilityEnum,
} from '@prisma-client';
import { GraphQLUpload, Upload } from 'graphql-upload-ts';
import { CreateInputGqlTranslationInputField } from 'nest-utils';

registerEnumType(PresentationType, { name: 'PresentationType' });
registerEnumType(CashbackType, { name: 'CashbackType' });
registerEnumType(ProdcutType, { name: 'ProductType' });
registerEnumType(ProductStatus, { name: 'ProductStatus' });
registerEnumType(ProductSize, { name: 'ProductSize' });

@InputType()
export class ProductPresentationInput {
  @Field(() => PresentationType)
  type: PresentationType;

  @Field(() => String)
  src: string;
}

@InputType()
export class CashBackInput {
  @Field(() => Int)
  units: number;

  @Field(() => Int)
  amount: number;

  @Field(() => CashbackType)
  type: CashbackType;
}

@InputType()
export class DiscountInput {
  @Field(() => Int)
  units: number;

  @Field(() => Int)
  amount: number;
}

@InputType()
export class ProductAttributeInput {
  @Field(() => ID)
  id: string;

  @Field(() => [ID])
  values: string[];
}

@InputType()
export class ProductAttributeValueInput {
  @Field(() => String)
  value: string;

  @Field(() => Float)
  price?: number;
}

@InputType()
export class StringTranslationField extends CreateInputGqlTranslationInputField(
  String,
) {}

@InputType()
export class CreateProductInput {
  @Field(() => String, { nullable: true })
  external_url?: string;

  @Field(() => ProdcutType)
  type: ProdcutType;

  @Field(() => StringTranslationField)
  title: StringTranslationField;

  @Field(() => StringTranslationField)
  description: StringTranslationField;

  @Field(() => ID)
  categoryId: string;

  @Field(() => [ProductAttributeInput])
  attributesIds?: ProductAttributeInput[];

  @Field(() => Int)
  stock: number;

  @Field(() => DiscountInput)
  discount: DiscountInput;

  @Field(() => String)
  cashbackId: string;

  @Field(() => [GraphQLUpload])
  presentations: Upload[];

  @Field(() => String)
  thumbnail: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  brand: string;

  @Field(() => VisibilityEnum)
  visibility: VisibilityEnum;

  @Field(() => Float)
  vat: number;

  @Field(() => ProductCondition)
  condition: ProductCondition;

  @Field(() => [ProductSize])
  sizes: ProductSize[];

  @Field(() => [String])
  colors: string[];
}
