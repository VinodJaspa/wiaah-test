import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { newsLetterCommands } from './commands';
import { NewsletterResolver } from './newsletter.resolver';
import { NewsletterRepository } from './repository';
import { NewsletterController } from './newsletter.controller';

@Module({
  imports: [CqrsModule],
  providers: [NewsletterResolver, NewsletterRepository, ...newsLetterCommands],
  controllers: [NewsletterController],
})
export class NewsletterModule {}
