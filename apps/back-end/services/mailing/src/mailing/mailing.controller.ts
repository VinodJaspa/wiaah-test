import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { MailingService } from './mailing.service';
import { SendRegisterationMailDto } from './dto/send-registeration-mail.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';

@Controller()
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @EventPattern('sendRegisterationMail')
  create(@Payload() createMailingDto: SendRegisterationMailDto) {
    return this.mailingService.sendRegisterationMail(createMailingDto);
  }
}
