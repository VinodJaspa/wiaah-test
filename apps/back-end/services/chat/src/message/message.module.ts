import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MessageCommandsHandlers } from './commands';
import { MessageResolver } from './message.resolver';
import { MessagesRepository } from './repository';

@Module({
  imports: [CqrsModule],
  providers: [MessageResolver, MessagesRepository, ...MessageCommandsHandlers],
})
export class MessageModule {}
