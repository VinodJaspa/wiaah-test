import { ObjectType, Field, Int, InputType } from "@nestjs/graphql";

@ObjectType()
export class PaginationData {
  @Field((type) => Boolean)
  has_more: boolean;

  @Field((type) => Int)
  page: number;
}

@InputType()
export class PaginationDataInput {
  @Field((type) => Int)
  take: number;

  @Field((type) => Int)
  page: number;
}
