import { InputType, Int, Field } from '@nestjs/graphql';
import { CurrencyName } from '@prisma-client';

@InputType()
export class CreateCurrencyInput {
  @Field((type) => CurrencyName)
  name: CurrencyName;

  @Field((type) => Int)
  exchangeRate: number;
}
