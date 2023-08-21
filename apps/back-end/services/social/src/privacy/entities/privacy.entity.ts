import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { MessagingSettings } from 'prismaClient';

registerEnumType(MessagingSettings, { name: 'MessagingSettings' });

@ObjectType()
export class PrivacySettings {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

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
