import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UnFollowProfileInput {
  @Field(() => String)
  profileId: string;
}
