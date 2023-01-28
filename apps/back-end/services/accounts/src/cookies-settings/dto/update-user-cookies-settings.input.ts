import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserCookiesSettingsInput {
  @Field(() => [ID])
  ids: string[];
}
