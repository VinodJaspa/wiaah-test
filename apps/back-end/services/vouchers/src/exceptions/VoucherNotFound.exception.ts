import { HttpException, HttpStatus } from '@nestjs/common';

export class VoucherNotFoundException extends HttpException {
  constructor(requestField: string = 'info') {
    super(
      `voucher with the given ${requestField} was not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
