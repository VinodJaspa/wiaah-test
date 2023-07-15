import { Field, ID, InputType } from '@nestjs/graphql';
import { GqlCursorPaginationInput } from 'nest-utils';

@InputType()
export class GetActionByAudioIdInput extends GqlCursorPaginationInput {
  @Field(() => ID)
  id: string;
}

@InputType()
export class GetActionsByEffectIdInput extends GqlCursorPaginationInput {
  @Field(() => ID)
  id: string;
}
