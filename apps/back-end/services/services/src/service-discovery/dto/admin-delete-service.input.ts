import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AdminDeleteServiceInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  deletionReason: string;
}
