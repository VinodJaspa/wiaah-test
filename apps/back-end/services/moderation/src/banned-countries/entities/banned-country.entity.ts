import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class BannedCity {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  cityId: string;

  @Field(() => String)
  bannedFor: string;
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
