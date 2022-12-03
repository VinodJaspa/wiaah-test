import { HttpException, HttpStatus } from '@nestjs/common';

export class BalanceNotFoundException extends HttpException {
  constructor(requestField: string) {
    super(
      `balance with the given ${requestField} was not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
