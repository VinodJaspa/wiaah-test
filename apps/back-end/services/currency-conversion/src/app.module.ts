import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CurrencyModule } from './currency/currency.module';
import { FixerModule } from './fixer/fixer.module';

@Module({
  imports: [CurrencyModule, ScheduleModule.forRoot(), FixerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
