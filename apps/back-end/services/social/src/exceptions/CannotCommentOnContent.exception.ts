import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotCommentOnContentException extends HttpException {
  constructor({
    contentType,
    reason,
  }: {
    reason?: string;
    contentType?: string;
  }) {
    super(
      `Cannot comment on this ${contentType || 'content'}${
        reason ? `, reason:${reason}` : ''
      }`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
