import { Module } from '@nestjs/common';
import { SearchShopsResolver } from './search-shops.resolver';
import { SearchShopsController } from './search-shops.controller';

@Module({
  providers: [SearchShopsResolver],
  controllers: [SearchShopsController],
})
export class SearchShopsModule {}
