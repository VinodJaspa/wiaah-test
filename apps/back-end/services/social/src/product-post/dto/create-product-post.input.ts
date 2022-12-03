import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateProductPostInput {
  @Field(() => ID)
  productId: string;
}
