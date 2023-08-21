import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { MessagingSettings } from 'prismaClient';

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

  @Field(() => MessagingSettings)
  initialMessaging: MessagingSettings;

  @Field(() => Boolean)
  messageReadStatus: boolean;
}
