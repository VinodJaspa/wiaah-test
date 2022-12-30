import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeclineSellerAccountRequest {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  reason: string;
}
