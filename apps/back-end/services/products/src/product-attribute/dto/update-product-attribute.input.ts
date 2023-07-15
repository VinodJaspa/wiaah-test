import {
  CreateProductAttributeInput,
  ProductAttributeValueInput,
} from './create-product-attribute.input';
import { InputType, Field, PartialType, ID, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateProductAttributeValueInput extends PartialType(
  ProductAttributeValueInput,
) {
  @Field(() => ID)
  id: string;
}

@InputType()
export class UpdateProductAttributeInput extends PartialType(
  OmitType(CreateProductAttributeInput, ['values']),
) {
  @Field(() => ID)
  id: string;

  @Field(() => [UpdateProductAttributeValueInput], { nullable: true })
  values?: UpdateProductAttributeValueInput[];
}
