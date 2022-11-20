import { Field, GraphQLISODateTime, ID, InputType } from '@nestjs/graphql';

const SearchType = {
  day: 'day',
  week: 'week',
  month: 'month',
};

@InputType()
export class GetMyBooknigsInput {
  @Field(() => GraphQLISODateTime)
  date: string;

  @Field(() => SearchType)
  searchPeriod: keyof typeof SearchType;
}
