import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RejectReceivedOrderInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  rejectReason: string;
}
