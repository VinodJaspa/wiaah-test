import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { CreateGqlCursorPaginatedResponse } from 'nest-utils';

@ObjectType()
export class Audio {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  authorUserId: string;

  @Field(() => ID)
  uploadId: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  usage: number;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

@ObjectType()
export class AudioCursorPaginationResponse extends CreateGqlCursorPaginatedResponse(
  Audio,
) {}
