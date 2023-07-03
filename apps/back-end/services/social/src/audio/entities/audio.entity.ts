import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CreateGqlCursorPaginatedResponse } from 'nest-utils';

@ObjectType()
export class Audio {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

@ObjectType()
export class AudioCursorPaginationResponse extends CreateGqlCursorPaginatedResponse(
  Audio,
) {}
