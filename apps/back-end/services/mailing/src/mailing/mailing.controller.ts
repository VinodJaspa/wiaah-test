import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailingService } from './mailing.service';
import { KafkaPayload, SendVerificationEmailEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';

@Controller()
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @EventPattern(KAFKA_EVENTS.MAILING_EVENTS.sendVerificationEmail)
  sendVerificationMail(
    @Payload() payload: KafkaPayload<SendVerificationEmailEvent>,
  ) {
    console.log('mailing...');
    return this.mailingService.sendVerificationMail(payload.value);
  }

  @EventPattern('testEvent')
  test(@Payload() payload) {
    console.log('mailing test', payload);
  }
}
