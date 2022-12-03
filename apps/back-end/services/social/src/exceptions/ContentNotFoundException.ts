import { HttpException, HttpStatus } from '@nestjs/common';

export class ContentNotFoundException extends HttpException {
  constructor() {
    super('this content was not found', HttpStatus.NOT_FOUND);
  }
}
