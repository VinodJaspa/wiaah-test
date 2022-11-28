import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserActivityStatInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
