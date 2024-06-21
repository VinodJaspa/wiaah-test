import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { ClassType } from "../../";

type IsStringTranslation<T> = T extends String ? string : T;

interface TranslationInputFields<T> {
  langId: string;
  value: IsStringTranslation<T>[];
}

export function CreateGqlInputTranslationInputFields<TData>(
  TItemClass: ClassType<TData>
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @InputType({ isAbstract: true })
  abstract class TranslationInputFieldsClass
    implements TranslationInputFields<TData>
  {
    @Field(() => String)
    langId: string;

    // here we use the runtime argument
    @Field(() => [TItemClass])
    // and here the generic type
    value: IsStringTranslation<TData>[];
  }
  return TranslationInputFieldsClass as ClassType<
    TranslationInputFields<TData>
  >;
}

interface TranslationInputField<T> {
  langId: string;
  value: IsStringTranslation<T>;
}

export function CreateInputGqlTranslationInputField<TData>(
  TItemClass: ClassType<TData>
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @InputType({ isAbstract: true })
  abstract class TranslationInputFieldClass
    implements TranslationInputField<TData>
  {
    @Field(() => String)
    langId: string;

    // here we use the runtime argument
    @Field(() => TItemClass)
    // and here the generic type
    value: IsStringTranslation<TData>;
  }
  return TranslationInputFieldClass as ClassType<TranslationInputField<TData>>;
}

interface ObjectTranslationInputFields<T> {
  langId: string;
  value: IsStringTranslation<T>[];
}

export function CreateGqlObjectTranslationInputFields<TData>(
  TItemClass: ClassType<TData>
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class TranslationInputFieldsClass
    implements ObjectTranslationInputFields<TData>
  {
    @Field(() => String)
    langId: string;

    // here we use the runtime argument
    @Field(() => [TItemClass])
    // and here the generic type
    value: IsStringTranslation<TData>[];
  }
  return TranslationInputFieldsClass as ClassType<
    ObjectTranslationInputFields<TData>
  >;
}

interface ObjectTranslationInputField<T> {
  langId: string;
  value: IsStringTranslation<T>;
}

export function CreateObjectGqlTranslationInputField<TData>(
  TItemClass: ClassType<TData>
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class TranslationInputFieldClass
    implements ObjectTranslationInputField<TData>
  {
    @Field(() => String)
    langId: string;

    // here we use the runtime argument
    @Field(() => TItemClass)
    // and here the generic type
    value: IsStringTranslation<TData>;
  }
  return TranslationInputFieldClass as ClassType<
    ObjectTranslationInputField<TData>
  >;
}
