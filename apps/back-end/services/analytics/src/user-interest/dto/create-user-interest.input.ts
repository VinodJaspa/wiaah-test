import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInterestInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
