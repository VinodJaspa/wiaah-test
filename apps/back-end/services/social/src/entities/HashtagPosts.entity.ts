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

function createHashtagPostsSearch<T>(Class: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class HashtagPostsSearch {
    @Field(() => Class)
    mostLikedPost: T;

    @Field(() => Class)
    mostCommentedPost: T;

    @Field(() => Class)
    mostLikedVideo: T;

    @Field(() => Class)
    mostViewedVideo: T;
  }
  return HashtagPostsSearch;
}

@ObjectType()
export class NewsfeedHashtagSearch extends createHashtagPostsSearch(
  NewsfeedPost,
) {}
