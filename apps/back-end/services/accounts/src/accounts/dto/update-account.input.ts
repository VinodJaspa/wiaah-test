import { CreateSellerAccountInput } from './create-account.input';
import { Field, ID, InputType, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput extends PartialType(
  OmitType(CreateSellerAccountInput, [
    'password',
    'confirmPassword',
    'email',
    'accountType',
  ]),
) {
  @Field(() => ID)
  id: string;
}

@InputType()
export class UpdateSellerAccountAdminInput extends PartialType(
  OmitType(CreateSellerAccountInput, ['confirmPassword']),
) {
  @Field(() => ID)
  id: string;
}
