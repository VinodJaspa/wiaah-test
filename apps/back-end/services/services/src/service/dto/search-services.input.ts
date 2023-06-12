import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchServicesInput {
  @Field(() => String, { nullable: true })
  q?: string;

  @Field(() => String, { nullable: true })
  locationQuery?: string;
}
