import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class HashtagInput {
  @Field(() => String)
  tag: string;
}
