export class ContentHiddenEvent {
  constructor(
    public readonly contentId: string,
    public readonly userId: string,
  ) {}
}
