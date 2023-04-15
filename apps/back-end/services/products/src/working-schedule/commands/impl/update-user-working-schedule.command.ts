import { UpdateWorkingScheduleInput } from '@working-schedule/dto';

export class UpdateUserWorkingSchedule {
  constructor(
    public readonly id: string,
    public readonly input: UpdateWorkingScheduleInput,
    public readonly userId: string,
  ) {}
}
