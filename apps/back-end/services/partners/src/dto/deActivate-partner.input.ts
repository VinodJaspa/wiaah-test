import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DeactivatePartnerInput {
  @Field((type) => ID)
  id: string;
}
