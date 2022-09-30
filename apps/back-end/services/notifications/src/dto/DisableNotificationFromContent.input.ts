import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class DisableNotificationFromContentInput {
  @Field(() => ID)
  contentId: string;
}
