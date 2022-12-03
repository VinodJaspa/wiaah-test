import { HttpException, HttpStatus } from '@nestjs/common';

export class VoucherNotActiveException extends HttpException {
  constructor() {
    super(
      'this voucher is not active, please try an active voucher',
      HttpStatus.BAD_REQUEST,
    );
  }
}
