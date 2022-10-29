import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetLocalizationInput {
  @Field(() => String)
  query: string;
}
