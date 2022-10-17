import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TranslationText {
  @Field(() => String)
  langId: string;

  @Field(() => String)
  value: string;
}

@ObjectType()
export class TranslationTextArray {
  @Field(() => String)
  langId: string;

  @Field(() => [String])
  value: string[];
}
