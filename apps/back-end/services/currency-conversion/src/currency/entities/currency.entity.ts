import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { CurrencyName } from '@prisma-client';

@ObjectType()
export class Currency {
  @Field((type) => ID)
  id: string;

  @Field((type) => CurrencyName)
  name: CurrencyName;

  @Field((type) => Int)
  exchangeRate: number;

  @Field((type) => Date)
  updatedAt: Date;
}
