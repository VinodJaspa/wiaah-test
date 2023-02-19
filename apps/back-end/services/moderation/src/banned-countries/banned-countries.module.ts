import { Module } from '@nestjs/common';
import { BannedCountriesResolver } from './banned-countries.resolver';

@Module({
  providers: [BannedCountriesResolver],
})
export class BannedCountriesModule {}
