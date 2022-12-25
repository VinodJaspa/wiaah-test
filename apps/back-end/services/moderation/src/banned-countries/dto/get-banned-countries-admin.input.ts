import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
export class GetBannedCountriesAdminFilters {
  @Field(() => String)
  country: string;

  @Field(() => String)
  city: string;
}

@InputType()
export class GetBannedCountriesAdminInput extends PartialType(
  GetBannedCountriesAdminFilters,
) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
