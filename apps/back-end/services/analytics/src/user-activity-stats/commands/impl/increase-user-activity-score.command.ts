export class IncreaseUserActivityScoreCommand {
  constructor(
    public readonly userId: string,
    public readonly score: number,
  ) {}
}
