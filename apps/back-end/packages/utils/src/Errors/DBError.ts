import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCodes } from "../index";
import { CustomError } from "./Error";

export class DBErrorException extends HttpException {
  constructor(description: string) {
    super(`Database error: ${description}`, HttpStatus.INTERNAL_SERVER_ERROR);
    this.stack = "";
  }
}
