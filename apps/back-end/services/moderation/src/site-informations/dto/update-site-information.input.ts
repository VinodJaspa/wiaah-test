import { CreateSiteInformationInput } from './create-site-information.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateSiteInformationInput extends PartialType(
  CreateSiteInformationInput,
) {
  @Field(() => ID)
  id: string;
}
