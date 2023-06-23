import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateServiceFilterInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
