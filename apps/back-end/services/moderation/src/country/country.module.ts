import { Module } from '@nestjs/common';
import { CityResolver } from './city.resolver';
import { CountryResolver } from './country.resolver';

@Module({
  providers: [CountryResolver, CityResolver],
})
export class CountryModule {}
