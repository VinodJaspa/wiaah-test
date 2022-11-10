import { CreateMembershipInput } from './create-membership.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateMembershipInput extends PartialType(CreateMembershipInput) {
  @Field(() => ID)
  id: string;
}
