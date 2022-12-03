import { HttpException, HttpStatus } from '@nestjs/common';

export class ProfileNotfoundException extends HttpException {
  constructor() {
    super(
      `a profile data was not found, please make sure you have an active profile`,
      HttpStatus.NOT_FOUND,
    );
  }
}
