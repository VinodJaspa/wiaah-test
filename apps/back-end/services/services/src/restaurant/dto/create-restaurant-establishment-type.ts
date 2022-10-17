import { TranslationText } from '@entities';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantEstablishmentTypeInput {
  @Field(() => [TranslationText])
  name: TranslationText[];
}
