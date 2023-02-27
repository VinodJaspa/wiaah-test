import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetCititesInput {
  @Field(() => String)
  name: string;

  @Field(() => ID)
  countryid: string;
}
