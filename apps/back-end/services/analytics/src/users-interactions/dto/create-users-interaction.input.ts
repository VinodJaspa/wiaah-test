import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUsersInteractionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
