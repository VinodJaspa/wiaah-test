import { Field, Int, ObjectType } from "@nestjs/graphql";
import { ClassType } from "../../types";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  hasMore: boolean;
}

export function CreateGqlPaginatedResponse<TData>(
  TItemClass: ClassType<TData>
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass implements PaginatedResponse<TData> {
    // here we use the runtime argument
    @Field(() => [TItemClass])
    // and here the generic type
    data: TData[];

    @Field(() => Int)
    total: number;

    @Field()
    hasMore: boolean;
  }
  return PaginatedResponseClass as ClassType<PaginatedResponse<TData>>;
}
interface CursorPaginatedResponse<T> {
  data: T[];
  cursor?: string;
  nextCursor?: string;
  hasMore: boolean;
  total?: number;
}

export function CreateGqlCursorPaginatedResponse<TData>(
  TItemClass: ClassType<TData>
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass
    implements CursorPaginatedResponse<TData>
  {
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
  return PaginatedResponseClass as ClassType<CursorPaginatedResponse<TData>>;
}
