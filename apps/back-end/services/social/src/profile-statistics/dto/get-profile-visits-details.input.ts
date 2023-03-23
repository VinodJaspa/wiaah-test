import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetProfileVisitsDetailsInput {
  @Field(() => Int)
  visitsOrderBy: number;

  @Field(() => String)
  country: string;

  @Field(() => ID)
  profileId: string;
}
