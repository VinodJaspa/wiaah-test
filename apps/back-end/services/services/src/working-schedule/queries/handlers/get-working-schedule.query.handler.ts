import { CommandBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CreateUserWorkingScheduleCommand } from '@working-schedule/commands';
import { ServiceWorkingSchedule } from '@working-schedule/entities';
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

  async execute({
    id,
  }: GetWorkingScheduleQuery): Promise<ServiceWorkingSchedule> {
    const res = await this.repo.getOne(id);
    if (!res)
      return this.commandbus.execute<
        CreateUserWorkingScheduleCommand,
        ServiceWorkingSchedule
      >(new CreateUserWorkingScheduleCommand(id));

    return res;
  }
}
