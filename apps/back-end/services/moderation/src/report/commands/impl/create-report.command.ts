import { CreateReportInput } from '@report/dto';

export class CreateReportCommand {
  constructor(
    public readonly input: CreateReportInput,
    public readonly userId: string,
  ) {}
}
