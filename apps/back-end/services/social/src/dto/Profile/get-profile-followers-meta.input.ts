import { Field, InputType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput } from 'nest-utils';

@InputType()
export class GetProfileFollowersMetaInput extends ExtendableGqlPaginationInput {
  @Field(() => String)
  profileId: string;
}

@InputType()
export class GetMyProfileFollowersMetaInput extends ExtendableGqlPaginationInput {}
