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
  const totalSearched = skip === 0 ? 0 : skip + currentTake;

  return {
    page: currentPage,
    skip,
    take: currentTake,
    totalSearched,
  };
};

export function setPrismaCursorPaginationProps<
  TModel extends { id: string },
  Tkey extends keyof TModel
// @ts-ignore
>(pagination: GqlCursorPaginationInput, cursorKey?: Tkey = "id") {
  return {
    take: pagination.take + 1,
    cursor: {
      [cursorKey]: pagination.cursor,
    },
  };
}

export function generateCursorPaginationResponse<TModel extends { id: string }>(
  pagination: GqlCursorPaginationInput,
  data: TModel[]
): {
  data: TModel[];
  cursor?: string;
  nextCursor?: string;
  hasMore: boolean;
  total?: number;
} {
  const hasMore = data.length > pagination.take;
  let nextCursor: string | undefined;

  if (hasMore) {
    if (data.length >= pagination.take) {
      nextCursor = data[pagination.take - 1].id;
    } else {
      nextCursor = undefined; // Handle case where `data` length is less than `pagination.take`
    }
  }

  return {
    cursor: pagination?.cursor,
    data: data.slice(0, pagination.take),
    hasMore,
    nextCursor,
  };
}
