import { HttpException, HttpStatus } from '@nestjs/common';

export class NotEnoughBalanceException extends HttpException {
  constructor() {
    super(
      "you don't have enough balance to perform this action",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
