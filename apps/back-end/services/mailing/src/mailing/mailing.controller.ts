import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailingService } from './mailing.service';
import {
  AccountRegisteredEvent,
  ChangePasswordEvent,
  KafkaPayload,
  SendVerificationEmailEvent,
} from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';

@Controller()
export class MailingController {
  private logger = new Logger(MailingController.name);
  constructor(private readonly mailingService: MailingService) {}

  @EventPattern(KAFKA_EVENTS.AUTH_EVENTS.accountRegistered)
  sendVerificationMail(
    @Payload() payload: KafkaPayload<AccountRegisteredEvent>,
  ) {
    console.log('calleds');
    const {
      value: {
        input: { email, firstName, verificationCode },
      },
    } = payload;
    return this.mailingService.sendVerificationMail(
      email,
      firstName,
      verificationCode,
    );
  }

  @EventPattern(KAFKA_EVENTS.AUTH_EVENTS.passwordChangeRequest)
  sendPasswordChangeMail(
    @Payload() payload: KafkaPayload<ChangePasswordEvent>,
  ) {
    try {
      const {
        value: {
          input: { email, name, verificationCode },
        },
      } = payload;
      return this.mailingService.sendPasswordChangeMail(
        email,
        name,
        verificationCode,
      );
    } catch (err) {
      this.logger.error(err);
    }
  }
}
