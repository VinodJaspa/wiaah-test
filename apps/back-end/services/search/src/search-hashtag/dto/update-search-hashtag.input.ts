import { CreateSearchHashtagInput } from './create-search-hashtag.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSearchHashtagInput extends PartialType(
  CreateSearchHashtagInput,
) {
  @Field(() => Int)
  id: number;
}
