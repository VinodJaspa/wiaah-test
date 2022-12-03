import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserWorkingSchedule } from '@working-schedule/commands/impl';
import { WorkingSchedule } from '@working-schedule/entities';
import { WorkingScheduleRepository } from '@working-schedule/repository';
import { WorkingScheduleUpdatedEvent } from '@working-schedule/events';

@CommandHandler(UpdateUserWorkingSchedule)
export class UpdateUserWorkingScheduleCommandHandler
  implements ICommandHandler<UpdateUserWorkingSchedule>
{
  constructor(
    private readonly prisma: WorkingScheduleRepository,
    private readonly eventbus: EventBus,
  ) {}

  async execute({
    id,
    userId,
    input,
  }: UpdateUserWorkingSchedule): Promise<WorkingSchedule> {
    const res = await this.prisma.update(id, input);
    this.eventbus.publish<WorkingScheduleUpdatedEvent>(
      new WorkingScheduleUpdatedEvent(res),
    );
    return res;
  }
}
