import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailingController } from './mailing.controller';
import { MailingQueryhandlers } from './queries';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [MailingController],
  providers: [MailingService, ...MailingQueryhandlers],
})
export class MailingModule {}
