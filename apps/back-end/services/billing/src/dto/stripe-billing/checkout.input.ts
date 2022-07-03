import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CheckoutInput {
  @Field((type) => String)
  billingAddressId: string;
}
