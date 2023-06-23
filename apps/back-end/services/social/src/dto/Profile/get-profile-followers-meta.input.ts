import { Field, InputType } from '@nestjs/graphql';
import {
  ExtendableGqlPaginationInput,
  GqlCursorPaginationInput,
} from 'nest-utils';

@InputType()
export class GetProfileFollowersMetaInput extends ExtendableGqlPaginationInput {
  @Field(() => String)
  profileId: string;
}

@InputType()
export class GetProfileFollowersMetaCursorInput extends GqlCursorPaginationInput {
  @Field(() => String)
  userId: string;
}

@InputType()
export class GetMyProfileFollowersMetaInput extends ExtendableGqlPaginationInput {}
