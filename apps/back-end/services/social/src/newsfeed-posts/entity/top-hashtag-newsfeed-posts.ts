import { NewsfeedPost } from '@entities';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TopHashtagNewsfeedPosts {
  @Field(() => NewsfeedPost)
  viewed: NewsfeedPost;

  @Field(() => NewsfeedPost)
  liked: NewsfeedPost;

  @Field(() => NewsfeedPost)
  commented: NewsfeedPost;

  @Field(() => NewsfeedPost)
  shared: NewsfeedPost;
}
