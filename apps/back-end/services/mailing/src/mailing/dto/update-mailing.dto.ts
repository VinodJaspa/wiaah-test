import { PartialType } from '@nestjs/mapped-types';
import { SendVerificationMailDto } from './send-registeration-mail.dto';

export class UpdateVerficiationMailDto extends PartialType(
  SendVerificationMailDto,
) {
  id: number;
}
