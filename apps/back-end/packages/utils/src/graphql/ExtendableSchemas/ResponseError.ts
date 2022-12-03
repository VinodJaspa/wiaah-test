import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";

export type ErrorCode = "DB" | "AUTH" | "APP";

export const ErrorCodes = {
  DB: "DB",
  AUTH: "AUTH",
  APP: "APP",
} as const;

registerEnumType(ErrorCodes, { name: "ErrorCode" });

// `isAbstract` decorator option is mandatory to prevent registering in schema
@ObjectType({ isAbstract: true })
export abstract class ResponseError {
  // here we use the runtime argument
  @Field(() => String)
  topic: string;

  @Field(() => ErrorCodes)
  code: ErrorCode;

  @Field(() => String)
  description: string;
}
