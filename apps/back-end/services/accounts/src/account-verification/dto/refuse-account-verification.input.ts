import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RefuseAccountVerificationRequest {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  reason: string;
}
