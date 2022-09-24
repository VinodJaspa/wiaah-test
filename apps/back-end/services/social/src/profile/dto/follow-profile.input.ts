import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FollowProfileInput {
  @Field(() => String)
  profileId: string;
}
