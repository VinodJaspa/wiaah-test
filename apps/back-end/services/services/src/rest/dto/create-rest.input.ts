import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRestInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
