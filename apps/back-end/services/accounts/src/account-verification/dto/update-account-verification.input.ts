import { CreateAccountVerificationInput } from './create-account-verification.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountVerificationInput extends PartialType(
  CreateAccountVerificationInput,
) {
  @Field(() => Int)
  id: number;
}
