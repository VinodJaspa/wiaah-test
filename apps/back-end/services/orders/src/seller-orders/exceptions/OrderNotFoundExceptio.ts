import { HttpException, HttpStatus } from '@nestjs/common';

export class OrdersNotFoundException extends HttpException {
  constructor(requestField: string) {
    super(
      `order with the given ${requestField} was not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
