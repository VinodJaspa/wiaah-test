import { HideContentInput } from '@hidden-content/dto';

export class HideContentCommand {
  constructor(
    public readonly input: HideContentInput,
    public readonly userId: string,
  ) {}
}
