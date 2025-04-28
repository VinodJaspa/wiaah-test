import { TranslationsInput } from '@decorators';
import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateInputGqlTranslationInputField } from 'nest-utils';

@InputType()
export class ServiceExtraNameTranslationInput extends CreateInputGqlTranslationInputField(
  String,
) {}

@InputType()
export class ServiceExtraInput {
  @Field(() => String)
  id: string;

  @Field(() => [ServiceExtraNameTranslationInput])
  @TranslationsInput()
  name: ServiceExtraNameTranslationInput[];

  @Field(() => Int)
  cost: number;
}
