export class GetActionByIdQuery {
  constructor(
    public readonly id: string,
    public readonly requesterId?: string,
  ) {}
}
