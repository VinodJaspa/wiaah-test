import { CreateWithdrawalInput } from './create-withdrawal.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWithdrawalInput extends PartialType(CreateWithdrawalInput) {
  @Field(() => Int)
  id: number;
}
