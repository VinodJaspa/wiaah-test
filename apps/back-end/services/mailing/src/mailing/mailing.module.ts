import { Module } from '@nestjs/common';
const Mailjet = require('node-mailjet');
import { MailingService } from './mailing.service';
import { MailingController } from './mailing.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  controllers: [MailingController],
  providers: [
    MailingService,
    {
      provide: 'MAIL_JET',
      useFactory: async (config: ConfigService) => {
        const apiKey = config.get('MJ_APIKEY');
        const apiSecret = config.get('MJ_SECRETKEY');

        const mailjet = new Mailjet({ apiKey, apiSecret });
        return mailjet;
      },
      inject: [ConfigService],
    },
  ],
})
export class MailingModule {}
