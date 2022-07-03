import { HttpException, HttpStatus } from '@nestjs/common';

export class TransactionNotFoundException extends HttpException {
  constructor(requestField: string) {
    super(
      `transaction with the given ${requestField} was not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
