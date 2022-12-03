import { CreateFixerInput } from './create-fixer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFixerInput extends PartialType(CreateFixerInput) {
  @Field(() => Int)
  id: number;
}
