import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { CreateGqlCursorPaginatedResponse } from 'nest-utils';
import { EffectStatus } from 'prismaClient';

registerEnumType(EffectStatus, { name: 'EffectStatus' });

@ObjectType()
export class Effect {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  usage: number;

  @Field(() => String)
  thumbnail: string;

  @Field(() => EffectStatus)
  status: EffectStatus;
}

@ObjectType()
export class EffectCursorPaginationResponse extends CreateGqlCursorPaginatedResponse(
  Effect,
) {}
