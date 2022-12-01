import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import {
  GetCommentsByContentId,
  GetUserFriendsIdsQuery,
  GetUsersActivityScoresQuery,
} from '@comments/queries/impl';
import { CommentsRepository } from '@comments/repository';
import { Comment } from '@entities';

@QueryHandler(GetCommentsByContentId)
export class GetCommentsByContentIdQueryHandler
  implements IQueryHandler<GetCommentsByContentId>
{
  constructor(
    private readonly repo: CommentsRepository,
    private readonly querybus: QueryBus,
  ) {}

  async execute({
    contentId,
    userId,
    cursor,
    take,
  }: GetCommentsByContentId): Promise<Comment[]> {
    const friendsScores = await this.querybus.execute<
      GetUserFriendsIdsQuery,
      { id: string; score: number }[]
    >(new GetUserFriendsIdsQuery(userId));

    const res = await this.repo.getAllByHostId(contentId);

    const notFriendsIds = res.filter(
      (v) => !friendsScores.find((f) => f.id === v.id),
    );

    const usersScores = await this.querybus.execute<
      GetUsersActivityScoresQuery,
      { id: string; score: number }[]
    >(new GetUsersActivityScoresQuery(notFriendsIds.map((v) => v.id)));

    const sortFriends = friendsScores.sort((a, b) => a.score - b.score);
    const sortActiveUsers = usersScores.sort((a, b) => a.score - b.score);
    const sortedIds = [...sortFriends, ...sortActiveUsers].map((v) => v.id);
    const sortedComments = sortedIds.map((v) =>
      res.find((c) => c.userId === v),
    );

    return cursor
      ? sortedComments.splice(
          sortedComments.findIndex((v) => v.id === cursor),
          take,
        )
      : sortedComments.splice(0, take);
  }
}
