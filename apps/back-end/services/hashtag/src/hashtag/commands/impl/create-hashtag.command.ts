export class CreateHashtagCommand {
  constructor(
    public tag: string,
    public readonly createdById: string,
  ) {}
}
