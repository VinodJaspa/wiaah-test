export class GetIsUserBlockedQuery {
  constructor(
    public readonly blockedUserId: string,
    public readonly blockerUserId: string,
  ) {}
}
