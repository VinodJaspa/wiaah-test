import { ResponseError, ErrorCode } from "../";

export class CustomError extends Error {
  constructor({ code, description, topic }: ResponseError) {
    super(description);
    this.name = topic;
    this.code = code;
  }
  code: ErrorCode;
}
