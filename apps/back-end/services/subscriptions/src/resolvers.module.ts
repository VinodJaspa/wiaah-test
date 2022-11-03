import { Module } from '@nestjs/common';
import { ChatResolver } from './resolvers/chat.resolver';

@Module({
  providers: [ChatResolver],
})
export class ResolversModule {}
