import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotInteractException extends HttpException {
  constructor() {
    super('You cannot interact with this content', HttpStatus.UNAUTHORIZED);
  }
}
