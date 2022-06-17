import { Controller, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { MailingService } from './mailing.service';
import { SendRegisterationMailDto } from './dto/send-registeration-mail.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';
import Mailjet from 'node-mailjet';

@Controller()
export class MailingController {
  constructor(
    private readonly mailingService: MailingService,
    @Inject('MAIL_JET') private readonly mailJet: Mailjet,
  ) {}

  @EventPattern('send_email_verification_mail')
  async create(@Payload() payload: SendRegisterationMailDto) {
    try {
      const request = await this.mailJet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: 'barco01014@gmail.com',
                Name: 'barco',
              },
              To: [
                {
                  Email: 'kero24862@gmail.com',
                  Name: 'kero',
                },
              ],
              Subject: 'Greetings from barco.',
              TextPart: 'My first Mailjet email',
              HTMLPart:
                "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
              CustomID: 'AppGettingStartedTest',
            },
          ],
        });
      console.log('success', request.body);
    } catch (error) {
      console.log('error', error);
    }
    return this.mailingService.sendRegisterationMail(payload);
  }
}
