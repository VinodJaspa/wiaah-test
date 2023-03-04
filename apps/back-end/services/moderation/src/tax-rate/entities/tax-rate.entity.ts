import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class TaxRate {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => Float)
  percent: number;

  @Field(() => [String])
  appliedOnCountryIds: string[];
}
