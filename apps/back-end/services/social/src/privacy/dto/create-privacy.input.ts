import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreatePrivacySettingsInput {
  @Field(() => Boolean)
  privateAccount: boolean;

  @Field(() => Boolean)
  hideLikesNum: boolean;

  @Field(() => Boolean)
  hideCommentsNum: boolean;

  @Field(() => Boolean)
  hideViewsNum: boolean;
}
