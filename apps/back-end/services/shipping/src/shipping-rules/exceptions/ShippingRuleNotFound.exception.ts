import { HttpException, HttpStatus } from '@nestjs/common';

export class ShippingRuleNotFoundException extends HttpException {
  constructor(requestField: string) {
    super(
      `shipping rule with the given ${requestField} was not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
