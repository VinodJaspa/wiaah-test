import { CreateUserMembershipInput } from './create-user-membership.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserMembershipInput extends PartialType(CreateUserMembershipInput) {
  @Field(() => Int)
  id: number;
}
