import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateAccountVerificationInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  fullName: string;

  @Field(() => String)
  knownAs: string;

  @Field(() => ID)
  categoryId: string;

  @Field(() => String)
  idPhoto: string;
}
