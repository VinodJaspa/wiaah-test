import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AcceptOrderRequestInput {
  @Field((type) => String)
  orderId: string;
}
