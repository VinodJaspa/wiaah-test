import { CommandBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CreateUserWorkingScheduleCommand } from '@working-schedule/commands';
import { WorkingSchedule } from '@working-schedule/entities';
import { GetWorkingScheduleQuery } from '@working-schedule/queries/impl';
import { WorkingScheduleRepository } from '@working-schedule/repository';

@QueryHandler(GetWorkingScheduleQuery)
export class GetWorkingScheduleQueryHandler
  implements IQueryHandler<GetWorkingScheduleQuery>
{
  constructor(
    private readonly repo: WorkingScheduleRepository,
    private readonly commandbus: CommandBus,
  ) {}

  async execute({ id }: GetWorkingScheduleQuery): Promise<WorkingSchedule> {
    const res = await this.repo.getOne(id);
    if (!res)
      return this.commandbus.execute<
        CreateUserWorkingScheduleCommand,
        WorkingSchedule
      >(new CreateUserWorkingScheduleCommand(id));

    return res;
  }
}
