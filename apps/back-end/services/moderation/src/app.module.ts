import { Module } from '@nestjs/common';
import { ReportModule } from '@report/report.module';
import { ContentSuspenseModule } from './content-suspense/content-suspense.module';
import { KafkaModule } from './kafka.module';
import { PrismaModule } from './prisma.module';
import { SiteInformationsModule } from './site-informations/site-informations.module';
import { DesignModule } from './design/design.module';
import { LanguageModule } from './language/language.module';
import { BannedCountriesModule } from './banned-countries/banned-countries.module';

@Module({
  imports: [ReportModule, ContentSuspenseModule, PrismaModule, KafkaModule, SiteInformationsModule, DesignModule, LanguageModule, BannedCountriesModule],
})
export class AppModule {}
