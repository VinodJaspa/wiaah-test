import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ActivatePartnerInput {
  @Field((type) => ID)
  id: string;
}
