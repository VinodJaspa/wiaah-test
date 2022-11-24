import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GqlStatusResponse {
  @Field(() => Int)
  code: number;

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => Boolean)
  success: boolean;
}
