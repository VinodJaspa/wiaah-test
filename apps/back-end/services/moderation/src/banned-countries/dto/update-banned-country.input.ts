import { CreateBannedCountryInput } from './create-banned-country.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBannedCountryInput extends PartialType(CreateBannedCountryInput) {
  @Field(() => Int)
  id: number;
}
