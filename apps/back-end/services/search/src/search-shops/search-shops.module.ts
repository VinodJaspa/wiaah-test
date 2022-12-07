import { Module } from '@nestjs/common';
import { SearchShopsService } from './search-shops.service';
import { SearchShopsResolver } from './search-shops.resolver';
import { SearchShopsController } from './search-shops.controller';

@Module({
  providers: [SearchShopsResolver, SearchShopsService],
  controllers: [SearchShopsController]
})
export class SearchShopsModule {}
