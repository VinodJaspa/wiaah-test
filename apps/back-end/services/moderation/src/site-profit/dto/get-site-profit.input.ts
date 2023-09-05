import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { ProfitStatsType } from 'prismaClient';

export enum StatsRetrivePeriod {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
}

registerEnumType(ProfitStatsType, { name: 'ProfitStatsType' });
registerEnumType(StatsRetrivePeriod, { name: 'StatsRetrivePeriod' });

@InputType()
export class GetSiteProfitInput {
  @Field(() => ProfitStatsType)
  type: ProfitStatsType;

  @Field(() => StatsRetrivePeriod)
  period: StatsRetrivePeriod;
}
