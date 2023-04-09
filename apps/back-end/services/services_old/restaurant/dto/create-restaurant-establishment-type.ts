import { TranslationTextInput } from '@dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantEstablishmentTypeInput {
  @Field(() => [TranslationTextInput])
  name: TranslationTextInput[];
}
