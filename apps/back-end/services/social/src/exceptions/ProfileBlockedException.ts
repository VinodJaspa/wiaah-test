import { HttpException, HttpStatus } from '@nestjs/common';

export class ProfileBlockedException extends HttpException {
  constructor() {
    super(`this profile has blocked you`, HttpStatus.FORBIDDEN);
  }
}
