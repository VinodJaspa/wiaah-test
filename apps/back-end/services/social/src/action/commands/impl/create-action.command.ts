import { CreateActionInput } from '@action/dto';

export class CreateActionCommand {
  constructor(
    public readonly input: CreateActionInput,
    public readonly userId: string,
  ) {}
}
