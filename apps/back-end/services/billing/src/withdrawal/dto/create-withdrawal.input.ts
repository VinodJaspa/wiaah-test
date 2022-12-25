import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateWithdrawalInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
