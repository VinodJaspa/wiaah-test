import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceDayWorkingHours {
  @Field(() => [String])
  periods: Date[];
}
