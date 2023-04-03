import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@InputType()
export class GqlPaginationInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  take: number;
}

@InputType()
export class GqlCursorPaginationInput {
  @Field(() => Int)
  take: number;

  @Field(() => String, { nullable: true })
  cursor?: string;
}

@ObjectType()
export class GqlCursorPaginationResponse {
  @Field(() => Int)
  take: number;

  @Field(() => String, { nullable: true })
  cursor?: string;
}

@InputType()
export class ExtendableGqlPaginationInput {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}

export const ExtractPagination = (pagination: GqlPaginationInput) => {
  if (!pagination)
    return {
      page: 0,
      skip: undefined,
      take: undefined,
      totalSearched: 0,
    };
  const { page, take } = pagination;

  const currentTake = take;
  const currentPage = page <= 0 ? 1 : page;
  const skip = (currentPage - 1) * currentTake;
  const totalSearched = skip + currentTake;

  return {
    page: currentPage,
    skip,
    take: currentTake,
    totalSearched,
  };
};
