import { HttpException, HttpStatus } from '@nestjs/common';

export class ProfileAlreadyBlockedException extends HttpException {
  constructor() {
    super(`You have already blocked this profile`, HttpStatus.BAD_REQUEST);
  }
}
