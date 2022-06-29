import { HttpException, HttpStatus } from '@nestjs/common';

export class ShippingRuleUnAuthorizedException extends HttpException {
  constructor() {
    super(
      'you can only modify and/or remove shipping rules of your shop',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
