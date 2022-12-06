import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class SuspenseContentInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  type: string;
}
