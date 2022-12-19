import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignResolver } from './design.resolver';

@Module({
  providers: [DesignResolver, DesignService]
})
export class DesignModule {}
