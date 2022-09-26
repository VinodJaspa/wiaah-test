import { HttpException, HttpStatus } from '@nestjs/common';

export class ProfileNotAccessableException extends HttpException {
  constructor(reason?: string) {
    super(
      `${
        reason ||
        'could not access this profile data, please make sure you requesting data you are allowed to'
      }`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
