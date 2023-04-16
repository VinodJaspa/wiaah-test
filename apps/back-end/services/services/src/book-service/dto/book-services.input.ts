import { InputType, Int, Field, ID, IntersectionType } from '@nestjs/graphql';

@InputType()
class required {
  @Field(() => ID)
  serviceId: string;

  @Field(() => Date)
  checkin: Date;

  @Field(() => Int)
  guests: number;
}

@InputType()
class optional {
  @Field(() => Date)
  checkout: Date;

  @Field(() => [ID])
  extrasIds: string[];

  @Field(() => [ID])
  treatmentsIds: string[];

  @Field(() => [ID])
  dishsIds: string[];
}

@InputType()
export class BookServiceInput extends IntersectionType(optional, required) {}
