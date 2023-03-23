import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetTopProfilePostsInput {
  @Field(() => ID)
  profileId: string;

  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;

  @Field(() => Int)
  sinceHours: number;
}
