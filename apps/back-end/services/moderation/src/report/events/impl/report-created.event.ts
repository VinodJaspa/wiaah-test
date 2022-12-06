import { Report } from 'prismaClient';

export class ReportCreatedEvent {
  constructor(public readonly report: Report) {}
}
