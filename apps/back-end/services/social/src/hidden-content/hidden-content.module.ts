import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { hiddenContentCommandHandlers } from './commands';
import { HiddenContentResolver } from './hidden-content.resolver';
import { hiddenContentQueryHandlers } from './queries';
import { HiddenContentRepository } from './repository';

@Module({
  imports: [CqrsModule],
  providers: [
    HiddenContentResolver,
    HiddenContentRepository,
    ...hiddenContentCommandHandlers,
    ...hiddenContentQueryHandlers,
  ],
})
export class HiddenContentModule {}
