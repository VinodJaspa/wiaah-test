import { Inject, Injectable, Logger } from '@nestjs/common';
import { SendVerificationMailDto } from './dto/send-registeration-mail.dto';
import Mailjet from 'node-mailjet';
import { SendVerificationEmailEvent } from 'nest-dto';

@Injectable()
export class MailingService {
  private logger = new Logger(MailingService.name);
  constructor(@Inject('MAIL_JET') private readonly mailJet: Mailjet) {}

  async sendVerificationMail(
    email: string,
    name: string,
    verificationCode: string,
  ) {
    try {
      console.log(
        `sending confirmation email to ${email} with the code ${verificationCode}`,
      );
      if (!email || !verificationCode) throw new Error('invalid inputs');
      await this.mailJet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'barco01014@gmail.com',
              Name: 'barco',
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: 'wiaah account verification',
            TextPart:
              'thanks for using wiaah, use the code below to continue the registeration proccess',
            HTMLPart:
              '<h3>Thanks for using wiaah</h3><br />here is your verification code: ' +
              verificationCode,
          },
        ],
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
    this.logger.log(
      `sending change password verification code for ${name} to ${email} with the code ${verificationCode}`,
    );
    await this.mailJet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'barco01014@gmail.com',
            Name: 'barco',
          },
          To: [
            {
              Email: email,
              Name: name,
            },
          ],
          Subject: 'wiaah change password verification',
          TextPart:
            'thanks for using wiaah, use the code below to change your password',
          HTMLPart:
            '<h3>Thanks for using wiaah</h3><br />here is your verification code: ' +
            verificationCode,
        },
      ],
    });
  }
}
