import { Module } from '@nestjs/common';
import { DesignResolver } from './design.resolver';

@Module({
  providers: [DesignResolver],
})
export class DesignModule {}
