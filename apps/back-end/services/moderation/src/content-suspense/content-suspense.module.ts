import { Module } from '@nestjs/common';
import { ContentSuspenseService } from './content-suspense.service';
import { ContentSuspenseResolver } from './content-suspense.resolver';

@Module({
  providers: [ContentSuspenseResolver, ContentSuspenseService]
})
export class ContentSuspenseModule {}
