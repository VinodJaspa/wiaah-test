import { Module } from '@nestjs/common';
import { ReportModule } from '@report/report.module';
import { ContentSuspenseModule } from './content-suspense/content-suspense.module';
import { KafkaModule } from './kafka.module';
import { PrismaModule } from './prisma.module';
import { SiteInformationsModule } from './site-informations/site-informations.module';
import { DesignModule } from './design/design.module';
import { LanguageModule } from './language/language.module';
import { BannedCountriesModule } from './banned-countries/banned-countries.module';
import { ProfessionModule } from './profession/profession.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { getUserFromRequest } from 'nest-utils';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { CountryModule } from './country/country.module';
import { TaxRateModule } from './tax-rate/tax-rate.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context({ req, res }) {
        const user = getUserFromRequest(req);
        return { req, res, user };
      },
    }),
    ReportModule,
    ContentSuspenseModule,
    PrismaModule,
    KafkaModule,
    SiteInformationsModule,
    DesignModule,
    LanguageModule,
    BannedCountriesModule,
    ProfessionModule,
    MaintenanceModule,
    CountryModule,
    TaxRateModule,
  ],
})
export class AppModule {}
