import { InputType, Int, Field } from '@nestjs/graphql';
import {
  ProductAttributeDisplayType,
  ProductAttributeSelectionType,
} from '@prisma-client';
import { TranslationTextInput } from '@shop';

@InputType()
export class ProductAttributeValueInput {
  @Field(() => [TranslationTextInput])
  name: TranslationTextInput[];

  @Field(() => String)
  value: string;
}

@InputType()
export class CreateProductAttributeInput {
  @Field(() => ProductAttributeDisplayType)
  displayType: ProductAttributeDisplayType;

  @Field(() => ProductAttributeSelectionType)
  selectionType: ProductAttributeSelectionType;

  @Field(() => [TranslationTextInput])
  name: TranslationTextInput[];

  @Field(() => [ProductAttributeValueInput])
  values: ProductAttributeValueInput[];
}
