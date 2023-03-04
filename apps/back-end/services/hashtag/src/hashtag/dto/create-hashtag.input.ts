import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateHashtagInput {
  @Field(() => String)
  tag: string;

  @Field(() => ID)
  createdById: string;
}
