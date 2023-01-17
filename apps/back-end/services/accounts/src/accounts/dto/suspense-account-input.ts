import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class SuspenseAccountAdminInput {
  @Field(() => ID)
  userId: string;

  @Field(() => String, { nullable: true })
  rejectReason?: string;
}
