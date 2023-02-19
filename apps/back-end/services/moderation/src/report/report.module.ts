import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ReportCommandHandlers } from './commands';
import { ReportQueryHandlers } from './queries';
import { ReportResolver } from './report.resolver';
import { ReportRepository } from './repository/report.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    ReportResolver,
    ReportRepository,
    ...ReportCommandHandlers,
    ...ReportQueryHandlers,
  ],
})
export class ReportModule {}
