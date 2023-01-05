export class GetAccountSocialFollowersCountQuery {
  constructor(public userId: string) {}
}

export type GetAccountSocialFollowersCountQueryRes = {
  followers: number;
};
