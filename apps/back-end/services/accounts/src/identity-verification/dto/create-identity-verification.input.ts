import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateIdentityVerificationInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  fullAddress: string;

  @Field(() => String)
  dateOfBirth: string;

  @Field(() => String)
  id_front: string;

  @Field(() => String)
  id_back: string;
}
