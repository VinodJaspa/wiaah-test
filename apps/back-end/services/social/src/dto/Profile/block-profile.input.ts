import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class BlockProfileInput {
  @Field(() => ID)
  profileId: string;
}

@InputType()
export class UnBlockProfileInput {
  @Field(() => ID)
  profileId: string;
}
