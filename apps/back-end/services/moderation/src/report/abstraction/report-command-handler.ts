import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { ReportRepository } from '@report/repository/report.repository';

export class ReportBaseHandler {
  querbus: QueryBus;
  commandbus: CommandBus;
  eventbus: EventBus;
  repo: ReportRepository;
  constructor(
    querybus: QueryBus,
    commandbus: CommandBus,
    eventbus: EventBus,
    repo: ReportRepository,
  ) {
    this.querbus = querybus;
    this.commandbus = commandbus;
    this.repo = repo;
    this.eventbus = eventbus;
  }
}
