import { Field, ObjectType } from "@nestjs/graphql";
import { ClassType } from "../../types";
import { ResponseError } from "./ResponseError";

export interface Response<T> {
  data: T | null;
}

export function CreateGqlResponse<TItem>(
  TItemClass: ClassType<TItem>
): ClassType<Response<TItem>> {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class ResponseClass implements Response<TItem> {
    // here we use the runtime argument
    @Field(() => TItemClass)
    // and here the generic type
    data: TItem | null;
  }
  return ResponseClass as ClassType<Response<TItem>>;
}

// Ensure TypeScript knows these types are valid ClassType<T>
const BooleanResponseClass = CreateGqlResponse(Boolean as any);
const NumberResponseClass = CreateGqlResponse(Number as any);
const StringResponseClass = CreateGqlResponse(String as any);

// Define the Boolean, Number, and String response classes explicitly
@ObjectType()
export class GqlBooleanResponse extends BooleanResponseClass { }

@ObjectType()
export class GqlNumberResponse extends NumberResponseClass { }

@ObjectType()
export class GqlStringResponse extends StringResponseClass { }
