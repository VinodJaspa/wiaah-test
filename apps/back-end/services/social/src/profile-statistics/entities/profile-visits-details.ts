import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileVisitDetails {
  @Field(() => String)
  country: string;

  @Field(() => Int)
  visits: number;
}

@ObjectType()
export class ProfileVisitsDetails {
  @Field(() => [ProfileVisitDetails])
  countries: ProfileVisitDetails[];
}
