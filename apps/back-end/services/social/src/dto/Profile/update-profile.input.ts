import { CreateProfileInput } from './create-profile.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {}

@InputType()
class input extends UpdateProfileInput {
  @Field(() => ID)
  profileId: string;
}

@InputType()
export class UpdateProfileAdminInput extends PartialType(input) {}
