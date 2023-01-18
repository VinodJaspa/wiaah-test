import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { ClassType } from "../../";

type IsStringTranslation<T> = T extends String ? string : T;

export function CreateGqlInputTranslationInputFields<TData>(
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

export function CreateInputGqlTranslationInputField<TData>(
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

export function CreateGqlObjectTranslationInputFields<TData>(
  TItemClass: ClassType<TData>
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
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

export function CreateObjectGqlTranslationInputField<TData>(
  TItemClass: ClassType<TData>
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
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
