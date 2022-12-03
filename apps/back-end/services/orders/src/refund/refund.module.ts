import { Module } from '@nestjs/common';
import { RefundService } from './refund.service';
import { RefundResolver } from './refund.resolver';

@Module({
  providers: [RefundResolver, RefundService]
})
export class RefundModule {}
