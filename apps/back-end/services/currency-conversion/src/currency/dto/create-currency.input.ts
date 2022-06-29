import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateCurrencyInput {
  @Field((type) => String)
  code: string;

  @Field((type) => Float)
  exchangeRate: number;
}
