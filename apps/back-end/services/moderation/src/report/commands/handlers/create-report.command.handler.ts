import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateReportCommand } from '@report/commands/impl';
import { Report } from '@report/entities';
import { ReportBaseHandler } from '@report/abstraction';
import { ReportCreatedEvent } from '@report/events/impl';

@CommandHandler(CreateReportCommand)
export class CreateReportCommandHandler
  extends ReportBaseHandler
  implements ICommandHandler<CreateReportCommand>
{
  async execute({ input, userId }: CreateReportCommand): Promise<Report> {
    const res = await this.repo.create(input, userId);
    this.eventbus.publish(new ReportCreatedEvent(res));
    return res;
  }
}
