import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  CreateGqlCursorPaginatedResponse,
  CreateGqlPaginatedResponse,
  CreateGqlResponse,
} from 'nest-utils';
import { Profile } from './profile.entity';

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
  Profile,
) {}

@ObjectType()
export class ProfileMetaCursorPaginatedResponse extends CreateGqlCursorPaginatedResponse(
  Profile,
) {}

@ObjectType()
export class ProfileMetaResponse extends CreateGqlResponse(ProfileMeta) {}
