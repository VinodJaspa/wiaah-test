import { Field, InputType } from '@nestjs/graphql';
import { GqlCursorPaginationInput } from 'nest-utils';

@InputType()
export class GetPostsByHashtagInput extends GqlCursorPaginationInput {
  @Field(() => String)
  hashtag: string;
}
