import { CreatePartnerInput } from './create-partner.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePartnerInput extends PartialType(CreatePartnerInput) {
  @Field(() => Int)
  id: number;
}
