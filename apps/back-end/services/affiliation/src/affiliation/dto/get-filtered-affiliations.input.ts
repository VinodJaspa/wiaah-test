import {
  Field,
  Float,
  GraphQLISODateTime,
  InputType,
  PartialType,
} from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
class input {
  @Field(() => String)
  seller: string;
  @Field(() => Float)
  commission: number;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  link: string;

  @Field(() => GraphQLISODateTime)
  createdBefore: string;

  @Field(() => GraphQLISODateTime)
  createdAfter: string;
}

@InputType()
export class GetFilteredAffiliationsInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
