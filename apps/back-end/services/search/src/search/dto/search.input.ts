import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class SearchInput {
  @Field(() => [String])
  filter: string[];
}
