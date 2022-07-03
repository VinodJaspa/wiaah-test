import { HttpException, HttpStatus } from '@nestjs/common';

export class BillingAddressNotFoundException extends HttpException {
  constructor(requestField: string) {
    super(
      `billing address with the given ${requestField} was not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
