import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFinancialAccountInput {
  @Field(() => Int)
  exampleField: number;
}
