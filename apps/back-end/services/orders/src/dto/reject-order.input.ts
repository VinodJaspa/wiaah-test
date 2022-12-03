import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RejectOrderRequestInput {
  @Field((type) => ID)
  orderId: string;

  @Field((type) => String, { nullable: true })
  rejectReason?: string;
}
