import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RefundCommandHandlers } from '@refund/commands';
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
  ],
})
export class RefundModule {}
