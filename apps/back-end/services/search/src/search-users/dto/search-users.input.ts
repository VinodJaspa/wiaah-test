import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class SearchUserInput {
  @Field(() => String)
  query: string;
}
