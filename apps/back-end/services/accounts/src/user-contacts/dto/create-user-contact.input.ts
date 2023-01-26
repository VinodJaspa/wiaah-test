import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserContactInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
