import { Field, GraphQLISODateTime, ID, InputType } from '@nestjs/graphql';

const SearchType = {
  day: 'day',
  week: 'week',
  month: 'month',
};
type SearchType = 'day' | 'week' | 'month';

@InputType()
export class GetMyBooknigsInput {
  @Field(() => String)
  date: string;

  @Field(() => String)
  searchPeriod: keyof typeof SearchType;
}
