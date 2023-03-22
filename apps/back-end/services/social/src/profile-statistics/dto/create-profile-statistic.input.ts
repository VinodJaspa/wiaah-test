import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProfileStatisticInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
