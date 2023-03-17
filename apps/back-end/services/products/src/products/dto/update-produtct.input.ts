import {
  CreateProductInput,
  ProductPresentationInput,
} from './create-produtct.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => ID)
  id: string;

  @Field(() => [ProductPresentationInput])
  oldPresentations: ProductPresentationInput[];
}
