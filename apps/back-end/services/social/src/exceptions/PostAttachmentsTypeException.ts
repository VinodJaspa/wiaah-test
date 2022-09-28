import { HttpException, HttpStatus } from '@nestjs/common';

export class PostAttachmentTypeException extends HttpException {
  constructor() {
    super(
      'a post attachments can only be either a 1 video or mulitply images at most 10',
      HttpStatus.BAD_REQUEST,
    );
  }
}
