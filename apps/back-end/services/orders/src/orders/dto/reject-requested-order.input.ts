import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RejectRequestedOrderInput {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  rejectReason: string;
}
