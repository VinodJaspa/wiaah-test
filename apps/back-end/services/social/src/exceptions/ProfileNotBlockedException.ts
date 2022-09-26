import { HttpException, HttpStatus } from '@nestjs/common';

export class ProfileNotBlockedException extends HttpException {
  constructor() {
    super('This profile is not blocked', HttpStatus.BAD_REQUEST);
  }
}
