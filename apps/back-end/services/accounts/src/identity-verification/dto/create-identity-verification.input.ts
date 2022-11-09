import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateIdentityVerificationInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  fullAddress: string;

  @Field(() => Date)
  dateOfBirth: Date;

  @Field(() => ID)
  id_front: string;

  @Field(() => ID)
  id_back: string;
}
