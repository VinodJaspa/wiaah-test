import { CreateUserInterestInput } from './create-user-interest.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInterestInput extends PartialType(CreateUserInterestInput) {
  @Field(() => Int)
  id: number;
}
