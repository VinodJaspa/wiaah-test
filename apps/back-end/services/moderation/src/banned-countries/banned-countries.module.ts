import { Module } from '@nestjs/common';
import { BannedCountriesService } from './banned-countries.service';
import { BannedCountriesResolver } from './banned-countries.resolver';

@Module({
  providers: [BannedCountriesResolver, BannedCountriesService]
})
export class BannedCountriesModule {}
