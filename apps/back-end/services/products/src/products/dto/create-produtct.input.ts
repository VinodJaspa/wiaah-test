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
  @Field((type) => PresentationType)
  type: PresentationType;

  @Field((type) => String)
  src: string;
}

@InputType()
export class CashBackInput {
  @Field((type) => Int)
  units: number;

  @Field((type) => Int)
  amount: number;

  @Field((type) => CashbackType)
  type: CashbackType;
}

@InputType()
export class DiscountInput {
  @Field((type) => Int)
  units: number;

  @Field((type) => Int)
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
) { }

@InputType()
export class CreateProductInput {
  @Field(() => String, { nullable: true })
  external_link?: string;

  @Field(() => ProdcutType)
  type: ProdcutType;

  @Field((type) => StringTranslationField)
  title: StringTranslationField;

  @Field((type) => StringTranslationField)
  description: StringTranslationField;

  @Field((type) => ID)
  categoryId: string;

  @Field(() => [ProductAttributeInput])
  attributesIds: ProductAttributeInput[];

  @Field((type) => Int)
  stock: number;

  @Field((type) => DiscountInput)
  discount: DiscountInput;

  @Field((type) => String)
  cashbackId: string;

  @Field((type) => [GraphQLUpload])
  presentations: Upload[];

  @Field(() => String)
  thumbnail: string;

  @Field((type) => Float)
  price: number;

  @Field((type) => String)
  brand: string;

  @Field((type) => VisibilityEnum)
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
