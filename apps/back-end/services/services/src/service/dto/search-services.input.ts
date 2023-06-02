import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchServicesInput {
  @Field(() => String)
  q: string;
}
