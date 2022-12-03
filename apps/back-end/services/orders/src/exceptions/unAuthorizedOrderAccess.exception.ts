import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedOrderAccessExecption extends HttpException {
  constructor() {
    super(
      'you cant access this order as you are not either the seller nor the buyer of it',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
