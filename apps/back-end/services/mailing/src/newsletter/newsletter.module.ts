import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { newsLetterCommands } from './commands';
import { NewsletterResolver } from './newsletter.resolver';
import { NewsletterRepository } from './repository';
import { NewsletterController } from './newsletter.controller';
import { PrismaService } from 'prismService';

@Module({
  imports: [CqrsModule],
  providers: [
    NewsletterResolver,
    NewsletterRepository,
    PrismaService,
    ...newsLetterCommands,
  ],
  controllers: [NewsletterController],
})
export class NewsletterModule {}
