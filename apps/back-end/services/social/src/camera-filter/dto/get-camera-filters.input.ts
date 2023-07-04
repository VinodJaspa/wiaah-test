import { Field, ID, InputType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput } from 'nest-utils';

@InputType()
export class GetCameraFiltersInput extends ExtendableGqlPaginationInput {
  @Field(() => ID)
  categoryId: string;
}
