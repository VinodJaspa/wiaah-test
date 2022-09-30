import { Field, ID, InputType } from '@nestjs/graphql';
import { PostType } from 'prismaClient';

@InputType()
export class SavePostInput {
  @Field(() => ID)
  postId: string;

  @Field(() => PostType)
  postType: PostType;
}
