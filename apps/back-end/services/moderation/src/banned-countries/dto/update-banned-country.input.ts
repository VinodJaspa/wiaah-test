import { BanCitiesInput } from './create-banned-country.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBannedCountryInput extends PartialType(BanCitiesInput) {
  @Field(() => Int)
  id: number;
}
