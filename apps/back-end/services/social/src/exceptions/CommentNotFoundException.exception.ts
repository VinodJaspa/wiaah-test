import { HttpException, HttpStatus } from '@nestjs/common';

export class CommentNotFoundException extends HttpException {
  constructor() {
    super('Comment Not Found', HttpStatus.NOT_FOUND);
  }
}
