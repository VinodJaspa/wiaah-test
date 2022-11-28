import { Module } from '@nestjs/common';
import { hiddenContentCommandHandlers } from './commands';
import { HiddenContentResolver } from './hidden-content.resolver';
import { hiddenContentQueryHandlers } from './queries';
import { HiddenContentRepository } from './repository';

@Module({
  providers: [
    HiddenContentResolver,
    HiddenContentRepository,
    ...hiddenContentCommandHandlers,
    ...hiddenContentQueryHandlers,
  ],
})
export class HiddenContentModule {}
