import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PostTagInput {
  @Field(() => String)
  userId: string;
}
