import { CreateProfileInput } from './create-profile.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {}

@InputType()
export class UpdateProfileAdminInput extends PartialType(
  class input extends UpdateProfileInput {
    profileId: string;
  },
) {}
