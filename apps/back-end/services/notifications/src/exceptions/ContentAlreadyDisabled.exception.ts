import { HttpException, HttpStatus } from '@nestjs/common';

export class ContentNotificationAlreadyDisabledException extends HttpException {
  constructor() {
    super('This content is already Disabled', HttpStatus.BAD_REQUEST);
  }
}
