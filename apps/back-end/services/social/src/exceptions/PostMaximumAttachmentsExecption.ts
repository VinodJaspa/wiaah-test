import { HttpException, HttpStatus } from '@nestjs/common';

export class PostMaximumAttachmentException extends HttpException {
  constructor(max: number) {
    super(`You need to attach at most ${max} files`, HttpStatus.BAD_REQUEST);
  }
}
