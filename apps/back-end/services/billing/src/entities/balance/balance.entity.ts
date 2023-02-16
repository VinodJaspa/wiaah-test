import { ObjectType, Field, ID, Float, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields:"id")')
@Directive('@key(fields:"ownerId")')
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
