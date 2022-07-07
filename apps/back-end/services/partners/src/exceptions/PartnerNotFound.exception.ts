import { HttpException, HttpStatus } from '@nestjs/common';

export class PartnerNotFoundException extends HttpException {
  constructor(requestField: string) {
    super(
      `partner with the given ${requestField} was not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
