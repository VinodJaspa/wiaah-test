import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PostType } from 'prismaClient';

registerEnumType(PostType, { name: 'PostType' });

@ObjectType()
export class UserSavedPost {
  @Field(() => ID)
  postId: string;

  @Field(() => PostType)
  postType: PostType;
}

@ObjectType()
export class UserSavedPostsGroup {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => [UserSavedPost])
  posts: UserSavedPost[];
}
