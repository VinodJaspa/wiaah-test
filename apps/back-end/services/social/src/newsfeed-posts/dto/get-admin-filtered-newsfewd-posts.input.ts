import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
class input {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  legend: string;

  @Field(() => Int)
  views: number;

  @Field(() => Int)
  likes: number;

  @Field(() => Int)
  comments: number;

  @Field(() => Int)
  shares: number;

  @Field(() => String)
  date: string;
}

@InputType()
export class GetAdminFilteredNewsfeedPostsInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
