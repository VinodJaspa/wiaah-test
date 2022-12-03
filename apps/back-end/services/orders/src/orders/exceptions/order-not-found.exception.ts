import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderNotFoundException extends HttpException {
  constructor() {
    super('order not found', HttpStatus.NOT_FOUND);
  }
}
