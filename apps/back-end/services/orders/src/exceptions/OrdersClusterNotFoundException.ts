import { HttpException, HttpStatus } from '@nestjs/common';

export class OrdersClusterNotFoundException extends HttpException {
  constructor(requestField: string) {
    super(
      `no orders record were found for this ${requestField}`,
      HttpStatus.NOT_FOUND,
    );
  }
}
