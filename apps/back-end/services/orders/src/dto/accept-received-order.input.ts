import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AcceptReceivedOrderInput {
  @Field((type) => ID)
  orderId: string;

  @Field((type) => ID)
  shopId: string;
}
