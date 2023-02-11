import { ObjectType, Field, ID, Float, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields:"code")')
export class Currency {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  code: string;

  @Field(() => String)
  symbol: string;

  @Field((type) => Float)
  exchangeRate: number;

  @Field((type) => Date)
  updatedAt: Date;
}
