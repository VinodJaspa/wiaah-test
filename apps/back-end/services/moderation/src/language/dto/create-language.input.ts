import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLanguageInput {
  @Field(() => String)
  locale: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Int)
  sortOrder: number;
}
