import { CreateRequiredActionInput } from './create-required-action.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRequiredActionInput extends PartialType(
  CreateRequiredActionInput,
) {
  @Field(() => Int)
  id: number;
}
