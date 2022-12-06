import { Injectable, Logger } from '@nestjs/common';

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
      console.log({ email, name, verificationCode });
      const res = await this.mailingservice.send({
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

  async sendTemplateMail(opts: {
    templateId: number;
    vars: Record<string, string>;
    to: { name: string; email: string }[];
    from?: { name: string; email: string };
  }) {
    await this.mailingservice.sendTemplate({
      subject: 'Order Shipping Confirmation',
      to: opts.to.map((v) => ({
        Email: v.email,
        Name: v.name,
      })),
      from: { Email: opts.from.email, Name: opts.from.name },
      templateId: opts.templateId,
      vars: opts.vars,
    });
  }
  async sendRawTemplate(props: {
    html: string;
    to: { name: string; email: string }[];
    from?: { email: string; name: string };
    subject: string;
  }) {
    await this.mailingservice.send({
      to: props.to.map((v) => ({
        Email: v.email,
        Name: v.name,
      })),
      from: { Email: props.from.email, Name: props.from.name },
      html: props.html,
      subject: props.subject,
      text: '',
    });
  }
}
