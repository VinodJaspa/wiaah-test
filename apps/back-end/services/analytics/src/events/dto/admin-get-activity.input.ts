import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';
import { AnalyticsEvents } from '../const';

@InputType()
class Input {
  @Field(() => AnalyticsEvents)
  event: AnalyticsEvents;

  @Field(() => String)
  description: string;
}

@InputType()
export class AdminGetEventsInput extends PartialType(Input) {
  @Field(() => GqlPaginationInput, { nullable: true })
  pagination?: GqlPaginationInput;
}
