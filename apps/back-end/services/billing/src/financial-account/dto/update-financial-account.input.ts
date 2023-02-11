import { CreateFinancialAccountInput } from './create-financial-account.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFinancialAccountInput extends PartialType(CreateFinancialAccountInput) {
  @Field(() => Int)
  id: number;
}
