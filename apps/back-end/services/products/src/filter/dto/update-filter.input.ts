import { CreateFilterInput } from './create-filter.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateFilterInput extends PartialType(CreateFilterInput) {
  @Field(() => ID)
  id: string;
}
