import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
  constructor(fieldName: string = 'id') {
    super(
      `product with the given ${fieldName} was not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
