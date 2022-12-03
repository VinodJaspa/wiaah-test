import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RejectRefundRequestInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true, defaultValue: '' })
  reason: string;
}
