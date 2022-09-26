import { HttpException, HttpStatus } from '@nestjs/common';

export class PostCreataionFailedException extends HttpException {
  constructor() {
    super(
      `Failed creating new post, please try again later`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
