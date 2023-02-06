import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Balance {
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  ownerId: string;

  @Field((type) => Float)
  withdrawableBalance: number;

  @Field((type) => Float)
  pendingBalance: number;

  @Field((type) => Float)
  cashbackBalance: number;

  @Field(() => Float)
  allTimeEarnings: number;

  @Field(() => Float)
  convertedCashbackBalance: number;

  @Field(() => String)
  balanceCurrency: string;
}
