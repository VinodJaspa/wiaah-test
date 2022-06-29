import { HttpException, HttpStatus } from '@nestjs/common';

export class ShippingSettingsNotFoundException extends HttpException {
  constructor(requestField: string) {
    super(
      `shipping settings with the given ${requestField} was not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
