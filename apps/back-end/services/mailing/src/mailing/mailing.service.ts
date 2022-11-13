import { Injectable, Logger } from '@nestjs/common';
import { Mailing } from '@const';

import { MailingService as NestMailingService } from '@nestjs/mailing';

@Injectable()
export class MailingService {
  private logger = new Logger(MailingService.name);
  constructor(private readonly mailingservice: NestMailingService) {}

  async sendVerificationMail(
    email: string,
    name: string,
    verificationCode: string,
  ) {
    try {
      if (!email || !verificationCode) throw new Error('invalid inputs');
      await this.mailingservice.send({
        to: [{ Email: email, Name: name }],
        subject: 'wiaah account verification',
        html:
          '<h3>Thanks for using wiaah</h3><br />here is your verification code: ' +
          verificationCode,
        text: 'thanks for using wiaah, use the code below to continue the registeration proccess',
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async sendPasswordChangeMail(
    email: string,
    name: string,
    verificationCode: string,
  ) {
    await this.mailingservice.send({
      to: [{ Email: email, Name: name }],
      subject: 'wiaah change password verification',
      html:
        '<h3>Thanks for using wiaah</h3><br />here is your verification code: ' +
        verificationCode,
      text: 'thanks for using wiaah, use the code below to change your password',
    });
  }
}
