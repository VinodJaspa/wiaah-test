import { CreateSellerAccountInput } from './create-account.input';
import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput extends PartialType(CreateSellerAccountInput) {}

@InputType()
export class UpdateSellerAccountAdminInput extends PartialType(
  CreateSellerAccountInput,
) {
  @Field(() => ID)
  id: string;
}
