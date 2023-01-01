import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateContentSuspenseInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
