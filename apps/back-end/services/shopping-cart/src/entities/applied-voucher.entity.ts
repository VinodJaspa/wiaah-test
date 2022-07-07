import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AppliedVoucher {
  @Field((type) => String)
  code: string;

  @Field((type) => Int)
  amount: number;

  @Field((type) => String)
  currency: string;

  @Field((type) => Int)
  convertedAmount: number;

  @Field((type) => String)
  convertedToCurrency: string;
}
