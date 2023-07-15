import { Field, ID, InputType } from '@nestjs/graphql';
import { GqlCursorPaginationInput } from 'nest-utils';

@InputType()
export class GetCameraFiltersInput extends GqlCursorPaginationInput {
  @Field(() => ID)
  categoryId: string;
}
