import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BlockResolver } from './block.resolver';
import { blockCommandHandlers } from './commands';
import { BlockEventHandlers } from './events';
import { blockQueryHandlers } from './queries';
import { BlockRepository } from './repository';

@Module({
  imports: [CqrsModule],
  providers: [
    BlockResolver,
    BlockRepository,
    ...blockCommandHandlers,
    ...BlockEventHandlers,
    ...blockQueryHandlers,
  ],
})
export class BlockModule {}
