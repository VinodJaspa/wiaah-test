import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceAmenity {
  @Field(() => String)
  value: string;

  @Field(() => String)
  label: string;
}
