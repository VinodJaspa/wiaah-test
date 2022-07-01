import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsPhoneNumber, IsPostalCode } from 'class-validator';

@ObjectType()
export class BuyerInfo {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  address: string;

  @Field((type) => String)
  address2: string;

  @Field((type) => String)
  country: string;

  @Field((type) => String)
  city: string;

  @Field((type) => String)
  state: string;

  @Field((type) => String)
  @IsPhoneNumber()
  phone: string;

  @Field((type) => String)
  @IsPostalCode()
  postalCode: string;
}
