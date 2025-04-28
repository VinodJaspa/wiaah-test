import { CreateIdentityVerificationInput } from './create-identity-verification.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateIdentityVerificationInput extends PartialType(
  CreateIdentityVerificationInput,
) {
  @Field(() => Int)
  id: number;
}
