import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { CreateGqlCursorPaginatedResponse } from 'nest-utils';
import { CameraFilterStatus } from 'prismaClient';

registerEnumType(CameraFilterStatus, { name: 'CameraFilterStatus' });

@ObjectType()
export class CameraFilter {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  filterStylesJSON: string;

  @Field(() => Int)
  usage: number;

  @Field(() => String)
  thumbnail: string;

  @Field(() => CameraFilterStatus)
  status: CameraFilterStatus;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

@ObjectType()
export class CameraFiltersCursorResponse extends CreateGqlCursorPaginatedResponse(
  CameraFilter,
) {}
