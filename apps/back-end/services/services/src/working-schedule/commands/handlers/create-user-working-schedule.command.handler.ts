import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserWorkingScheduleCommand } from '@working-schedule/commands/impl';
import { WorkingSchedule } from '@working-schedule/entities';
import { WorkingScheduleRepository } from '@working-schedule/repository';

@CommandHandler(CreateUserWorkingScheduleCommand)
export class CreateUserWorkingScheduleCommandHandler
  implements ICommandHandler<CreateUserWorkingScheduleCommand>
{
  constructor(private readonly repo: WorkingScheduleRepository) {}

  async execute({
    id,
  }: CreateUserWorkingScheduleCommand): Promise<WorkingSchedule> {
    const res = await this.repo.createDefault(id);
    return res;
  }
}
