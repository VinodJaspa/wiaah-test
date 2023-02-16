import { InputType, Field } from '@nestjs/graphql';
import {
  IsPostalCode,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateBillingAddressInput {
  @Field((type) => String)
  @IsString()
  @MinLength(5)
  address: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field((type) => String)
  address2: string;

  @Field((type) => String)
  country: string;

  @Field((type) => String)
  city: string;

  @Field((type) => String)
  state: string;

  @Field((type) => String)
  @IsPostalCode()
  postalCode: string;
  @Field((type) => String)
  @IsPhoneNumber()
  phone: string;
}
