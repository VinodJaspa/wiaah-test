import { HttpException, HttpStatus } from '@nestjs/common';

export class PostMinimumAttachmentsException extends HttpException {
  constructor(min: number) {
    super(`You need to attach atleast ${min} files`, HttpStatus.BAD_REQUEST);
  }
}
