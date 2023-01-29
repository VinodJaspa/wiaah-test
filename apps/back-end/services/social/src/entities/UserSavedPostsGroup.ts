import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PostType } from 'prismaClient';
import { NewsfeedPost } from './post.entity';

registerEnumType(PostType, { name: 'PostType' });

@ObjectType()
export class UserSavedPost {
  @Field(() => ID)
  postId: string;

  @Field(() => PostType)
  postType: PostType;

  @Field(() => NewsfeedPost)
  post: NewsfeedPost;
}

@ObjectType()
export class UserSavedPostsGroup {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => [NewsfeedPost])
  posts: NewsfeedPost[];
}
