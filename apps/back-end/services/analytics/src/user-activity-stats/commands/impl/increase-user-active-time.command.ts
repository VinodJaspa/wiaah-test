export class IncreaseUserActiveTimeCommand {
  constructor(
    public readonly userId: string,
    public readonly mins: number,
  ) {}
}
