import { Module } from '@nestjs/common';
import { SiteInformationsResolver } from './site-informations.resolver';

@Module({
  providers: [SiteInformationsResolver],
})
export class SiteInformationsModule {}
