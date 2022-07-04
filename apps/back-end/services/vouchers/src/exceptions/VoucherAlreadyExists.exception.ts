import { HttpException, HttpStatus } from '@nestjs/common';

export class VoucherAlreadyExistsException extends HttpException {
  constructor(requestField: string = 'code') {
    super(
      `a voucher with this ${requestField} already exists, consider deleting or updating the current voucher`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
