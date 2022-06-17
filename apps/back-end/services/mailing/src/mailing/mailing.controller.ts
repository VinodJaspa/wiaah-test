import { Controller, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { MailingService } from './mailing.service';
import { SendVerificationMailDto } from './dto/send-registeration-mail.dto';

@Controller()
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @EventPattern('send_email_verification_mail')
  sendVerificationMail(@Payload() payload: { value: SendVerificationMailDto }) {
    return this.mailingService.sendVerificationMail(payload.value);
  }
}
