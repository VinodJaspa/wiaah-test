import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CreateGqlPaginatedResponse, CreateGqlResponse } from 'nest-utils';

@ObjectType()
export class ProfileMeta {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  photo: string;
}

@ObjectType()
export class ProfileMetaPaginatedResponse extends CreateGqlPaginatedResponse(
  ProfileMeta,
) {}

@ObjectType()
export class ProfileMetaResponse extends CreateGqlResponse(ProfileMeta) {}
