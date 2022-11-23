import { CreatePostInput } from '@input';
import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateProductPostInput extends CreatePostInput {
  @Field(() => ID)
  productId: string;
}
