import { Module } from '@nestjs/common';
import {
  BannedCountriesResolver,
  BannedCountryResolver,
} from './banned-countries.resolver';

@Module({
  providers: [BannedCountriesResolver, BannedCountryResolver],
})
export class BannedCountriesModule {}
