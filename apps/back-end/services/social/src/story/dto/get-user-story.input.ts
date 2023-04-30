import { Field, InputType, Int } from '@nestjs/graphql';
import { Story } from '@story/entities';

@InputType()
export class GetUserStoryInput {
  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field(() => String)
  userId: string;

  @Field(() => Int)
  dir: number;

  @Field(() => String, { nullable: true })
  nextCursor?: string;
}
