import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemovePartnerInput {
  @Field((type) => ID)
  partnerId: string;
}
