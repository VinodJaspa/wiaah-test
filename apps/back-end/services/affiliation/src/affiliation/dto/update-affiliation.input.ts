import { CreateAffiliationInput } from './create-affiliation.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAffiliationInput extends PartialType(
  CreateAffiliationInput,
) {
  @Field(() => ID)
  id: string;
}

@InputType()
export class UpdateAffiliationAdminInput extends PartialType(
  CreateAffiliationInput,
) {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  sellerId: string;
}
