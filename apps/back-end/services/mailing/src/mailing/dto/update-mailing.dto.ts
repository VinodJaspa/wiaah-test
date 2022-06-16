import { PartialType } from '@nestjs/mapped-types';
import { SendRegisterationMailDto } from './send-registeration-mail.dto';

export class UpdateMailingDto extends PartialType(SendRegisterationMailDto) {
  id: number;
}
