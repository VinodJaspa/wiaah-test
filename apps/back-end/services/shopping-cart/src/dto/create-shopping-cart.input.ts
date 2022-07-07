import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateShoppingCartInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
