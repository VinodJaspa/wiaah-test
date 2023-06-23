import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ClassType } from "../../types";

export function CreateGqlPaginatedResponse<TData>(
  TItemClass: ClassType<TData>
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    // here we use the runtime argument
    @Field(() => [TItemClass])
    // and here the generic type
    data: TData[];

    @Field(() => Int)
    total: number;

    @Field()
    hasMore: boolean;
  }
  return PaginatedResponseClass;
}

export function CreateGqlCursorPaginatedResponse<TData>(
  TItemClass: ClassType<TData>
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    // here we use the runtime argument
    @Field(() => [TItemClass])
    // and here the generic type
    data: TData[];

    @Field(() => String, { nullable: true })
    cursor?: string;

    @Field(() => String, { nullable: true })
    nextCursor?: string;

    @Field(() => Boolean)
    hasMore: boolean;

    @Field(() => Int, { defaultValue: 0 })
    total?: number;
  }
  return PaginatedResponseClass;
}
