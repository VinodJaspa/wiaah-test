import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventSchedulingInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
