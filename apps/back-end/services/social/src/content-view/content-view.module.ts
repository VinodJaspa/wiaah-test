import { Module } from '@nestjs/common';
import { ContentViewResolver } from './content-view.resolver';

@Module({
  providers: [ContentViewResolver],
})
export class ContentViewModule {}
