import { CommandBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CreateUserWorkingScheduleCommand } from '@working-schedule/commands';
import { ShopWorkingSchedule } from '@working-schedule/entities';
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

  async execute({ id }: GetWorkingScheduleQuery): Promise<ShopWorkingSchedule> {
    const res = await this.repo.getOne(id);
    if (!res)
      return this.commandbus.execute<
        CreateUserWorkingScheduleCommand,
        ShopWorkingSchedule
      >(new CreateUserWorkingScheduleCommand(id));

    return res;
  }
}
