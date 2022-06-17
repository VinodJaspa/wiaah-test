import { Inject, Injectable } from '@nestjs/common';
import { SendVerificationMailDto } from './dto/send-registeration-mail.dto';
import Mailjet from 'node-mailjet';

@Injectable()
export class MailingService {
  constructor(@Inject('MAIL_JET') private readonly mailJet: Mailjet) {}

  async sendVerificationMail(input: SendVerificationMailDto) {
    try {
      const { email, verificationToken } = input;
      console.log(
        `sending confirmation email to ${email} with the code ${verificationToken}`,
      );
      if (!email || !verificationToken) throw new Error('invalid inputs');
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
                Name: 'customer',
              },
            ],
            Subject: 'wiaah account verification',
            TextPart:
              'thanks for using wiaah, use the code to continue the registeration proccess',
            HTMLPart:
              '<h3>Thanks for using wiaah</h3><br />here is your verification code: ' +
              verificationToken,
            // CustomID: 'AppGettingStartedTest',
          },
        ],
      });
    } catch (error) {
      console.log('error', error);
    }
  }
}
