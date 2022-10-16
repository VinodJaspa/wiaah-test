import { TranslationsInput } from '@decorators';
import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateGqlTranslationInputField } from 'nest-utils';

@InputType()
export class ServiceExtraNameTranslationInput extends CreateGqlTranslationInputField(
  String,
) {}

@InputType()
export class ServiceExtraInput {
  @Field(() => [ServiceExtraNameTranslationInput])
  @TranslationsInput()
  name: ServiceExtraNameTranslationInput[];

  @Field(() => Int)
  cost: number;
}
