import { Field, ObjectType } from "@nestjs/graphql";
import { ClassType } from "../../types";
import { ResponseError } from "./ResponseError";

export function CreateGqlResponse<TItem>(TItemClass: ClassType<TItem>) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class ResponseClass {
    // here we use the runtime argument
    @Field((type) => TItemClass)
    // and here the generic type
    data: TItem | null;
  }
  return ResponseClass;
}
