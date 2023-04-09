import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

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

  @Field(() => Int)
  days: number;
}
