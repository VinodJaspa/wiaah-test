import { Field, InputType } from "@nestjs/graphql";
import { ClassType } from "../../";

type IsStringTranslation<T> = T extends String ? string : T;

export function CreateGqlTranslationInputFields<TData>(
  TItemClass: ClassType<TData>
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @InputType({ isAbstract: true })
  abstract class TranslationInputFields {
    @Field(() => String)
    langId: string;

    // here we use the runtime argument
    @Field(() => [TItemClass])
    // and here the generic type
    value: IsStringTranslation<TData>[];
  }
  return TranslationInputFields;
}

export function CreateGqlTranslationInputField<TData>(
  TItemClass: ClassType<TData>
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @InputType({ isAbstract: true })
  abstract class TranslationInputField {
    @Field(() => String)
    langId: string;

    // here we use the runtime argument
    @Field(() => TItemClass)
    // and here the generic type
    value: IsStringTranslation<TData>;
  }
  return TranslationInputField;
}
