import { CustomError } from "./Error";
import { ErrorCodes } from "../";
import { HttpException, HttpStatus } from "@nestjs/common";

export class AppErrorException extends HttpException {
  constructor(description: string) {
    super(
      `Application Error: ${description}`,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
