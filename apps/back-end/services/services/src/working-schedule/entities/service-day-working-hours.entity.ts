import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceServiceDayWorkingHours {
  @Field(() => [String])
  periods: Date[];
}
