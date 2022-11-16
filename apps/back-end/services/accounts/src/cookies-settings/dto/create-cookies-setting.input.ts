import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCookiesSettingInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: String;

  @Field(() => Boolean)
  required: boolean;

  @Field(() => [String])
  benefits: string[];

  @Field(() => [String])
  cons: string[];
}
