export class GetCommentHostDataQuery {
  constructor(
    public id: string,
    public type: string,
  ) {}
}

export type GetCommentHostDataQueryRes = {
  authorId: string;
  type: string;
  id: string;
};
