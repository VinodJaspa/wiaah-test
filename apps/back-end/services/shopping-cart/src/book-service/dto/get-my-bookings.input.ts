import {
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';

enum SearchType {
  day = 'day',
  week = 'week',
  month = 'month',
}

registerEnumType(SearchType, { name: 'MyBookingsSearchPeriod' });

@InputType()
export class GetMyBookingsInput {
  @Field(() => String)
  date: string;

  @Field(() => SearchType)
  searchPeriod: SearchType;
}
