import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class BannedCity {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => ID)
  bannedCountryId: string;

  @Field(() => BannedCountry)
  bannedCity: BannedCity;
}

@ObjectType()
export class BannedCountry {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  isoCode: string;

  @Field(() => [BannedCity])
  cities: BannedCity[];
}
