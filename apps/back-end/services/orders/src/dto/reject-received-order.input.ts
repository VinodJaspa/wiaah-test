import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RejectRecievedOrderInput {
  @Field((type) => ID)
  shopId: string;

  @Field((type) => ID)
  orderId: string;

  @Field((type) => String)
  rejectReason: string;
}
