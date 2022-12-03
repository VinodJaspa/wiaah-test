import { CreatePrivacySettingsInput } from './create-privacy.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMyPrivacyInput extends PartialType(
  CreatePrivacySettingsInput,
) {}
