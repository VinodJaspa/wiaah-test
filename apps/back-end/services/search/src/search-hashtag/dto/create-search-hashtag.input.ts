import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSearchHashtagInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
