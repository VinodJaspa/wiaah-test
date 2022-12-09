export class GetUserFollowersIdsQuery {
  constructor(public id: string) {}
}

export type GetUserFollowersIdsQueryRes = { id: string }[];
