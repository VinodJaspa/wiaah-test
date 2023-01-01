import { Module } from '@nestjs/common';
import { ReportCommandHandlers } from './commands';
import { ReportQueryHandlers } from './queries';
import { ReportResolver } from './report.resolver';
import { ReportRepository } from './repository/report.repository';

@Module({
  providers: [
    ReportResolver,
    ReportRepository,
    ...ReportCommandHandlers,
    ...ReportQueryHandlers,
  ],
})
export class ReportModule {}
