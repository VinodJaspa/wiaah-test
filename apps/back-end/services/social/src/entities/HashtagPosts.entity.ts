import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ClassType } from 'nest-utils';
import { NewsfeedPost } from './post.entity';

@ObjectType()
export class HashtagSearch {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field(() => ID)
  profileId: string;

  @Field(() => Int)
  views: number;

  @Field(() => String)
  tag: string;
}

export interface HashtagPostsSearchFields<T> {
  mostLikedPost: T;
  mostCommentedPost: T;
  mostLikedVideo: T;
  mostViewedVideo: T;
}
// Create a function to generate a GraphQL input type
export function createHashtagPostsSearch<T>(ItemClass: ClassType<T>) {
  // Define an abstract class to prevent it from being registered in the schema
  @ObjectType({ isAbstract: true })
  abstract class HashtagPostsSearchClass
    implements HashtagPostsSearchFields<T>
  {
    @Field(() => ItemClass)
    mostLikedPost: T;

    @Field(() => ItemClass)
    mostCommentedPost: T;

    @Field(() => ItemClass)
    mostLikedVideo: T;

    @Field(() => ItemClass)
    mostViewedVideo: T;
  }
  return HashtagPostsSearchClass as ClassType<HashtagPostsSearchFields<T>>;
}

@ObjectType()
export class NewsfeedHashtagSearch extends createHashtagPostsSearch(
  NewsfeedPost,
) {}
