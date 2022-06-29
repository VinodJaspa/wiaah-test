import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShippingCountry {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  code: string;
}
