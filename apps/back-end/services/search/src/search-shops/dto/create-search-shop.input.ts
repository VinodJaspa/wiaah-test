import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSearchShopInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
