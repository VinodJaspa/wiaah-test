import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserMembershipInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
