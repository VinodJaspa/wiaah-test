import { Field, InputType } from '@nestjs/graphql';
import { ExtendableGqlPaginationInput } from 'nest-utils';

@InputType()
export class SearchServicesFilterInput {
  @Field(() => String)
  id: string;

  @Field(() => [String])
  value: string[];
}

@InputType()
export class SearchServicesInput extends ExtendableGqlPaginationInput {
  @Field(() => String, { nullable: true })
  q?: string;

  @Field(() => String, { nullable: true })
  locationQuery?: string;

  @Field(() => [SearchServicesFilterInput])
  filters: SearchServicesFilterInput[];
}
