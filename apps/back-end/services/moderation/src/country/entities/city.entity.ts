import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class City {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  code: string;

  @Field(() => String)
  name: string;

  @Field(() => ID)
  countryId: string;
}
