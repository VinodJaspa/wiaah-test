import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteBillingAddressInput {
  @Field((type) => ID)
  addressId: string;
}
