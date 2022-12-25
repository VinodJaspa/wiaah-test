import { InputType, Field } from '@nestjs/graphql';
import { ShippingType } from '@prisma-client';

@InputType()
export class CreateShippingTypeRuleInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => ShippingType)
  type: ShippingType;
}
