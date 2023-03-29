import { CreateFinancialAccountInput } from './create-financial-account.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateFinancialAccountInput extends PartialType(
  CreateFinancialAccountInput,
) {
  @Field(() => ID)
  id: string;
}
