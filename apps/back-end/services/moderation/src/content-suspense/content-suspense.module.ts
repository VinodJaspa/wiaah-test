import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ContentSuspenseResolver } from './content-suspense.resolver';

@Module({
  imports: [CqrsModule],
  providers: [ContentSuspenseResolver],
})
export class ContentSuspenseModule {}
