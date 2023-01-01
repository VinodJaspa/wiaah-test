import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RefundCommandHandlers } from '@refund/commands';
import { RefundEventHandlers } from './events';
import { RefundQueryHandler } from './queries';
import { RefundResolver } from './refund.resolver';
import { RefundRepository } from './repository';

@Module({
  imports: [CqrsModule],
  providers: [
    RefundResolver,
    RefundRepository,
    ...RefundCommandHandlers,
    ...RefundQueryHandler,
    ...RefundEventHandlers,
  ],
})
export class RefundModule {}
