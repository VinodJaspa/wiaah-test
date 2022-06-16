import { Injectable } from '@nestjs/common';
import { SendRegisterationMailDto } from './dto/send-registeration-mail.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';

@Injectable()
export class MailingService {
  sendRegisterationMail(input: SendRegisterationMailDto) {
    console.log(input);
  }
}
