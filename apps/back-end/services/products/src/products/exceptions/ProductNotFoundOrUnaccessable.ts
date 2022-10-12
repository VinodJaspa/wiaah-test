import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundOrUnaccessable extends HttpException {
  constructor() {
    super(
      `cannot find this product or this account doesnt have premssion to view it`,
      HttpStatus.NOT_FOUND,
    );
  }
}
