import { HttpException, HttpStatus } from '@nestjs/common';

export class UserCannotViewContentException extends HttpException {
  constructor(reason?: string) {
    super(
      `Cannot view this content${reason ? `, reason:${reason}` : ''}`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
