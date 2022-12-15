import { CreateSiteInformationInput } from './create-site-information.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSiteInformationInput extends PartialType(CreateSiteInformationInput) {
  @Field(() => Int)
  id: number;
}
