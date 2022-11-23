import { CreateProductPostInput } from './create-product-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductPostInput extends PartialType(CreateProductPostInput) {
  @Field(() => Int)
  id: number;
}
