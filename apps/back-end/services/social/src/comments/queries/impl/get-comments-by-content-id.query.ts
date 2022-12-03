export class GetCommentsByContentId {
  constructor(
    public readonly contentId: string,
    public readonly userId: string,
    public readonly cursor?: string,
    public readonly take?: number,
  ) {}
}
