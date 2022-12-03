import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SearchPopularProfilesInput {
  @Field(() => String)
  q: string;

  @Field(() => String, { nullable: true })
  cursor: string;

  @Field(() => Int, { defaultValue: 15 })
  take: number;
}
