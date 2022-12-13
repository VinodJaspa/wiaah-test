import { Field, Float, GraphQLISODateTime, InputType } from '@nestjs/graphql';

@InputType()
export class GetFilteredAffiliationsInput {
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
