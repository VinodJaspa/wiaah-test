import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import {
  GetCommentsByContentId,
  GetUserFriendsIdsQuery,
  GetUsersActivityScoresQuery,
} from '@comments/queries/impl';
import { CommentsRepository } from '@comments/repository';
import { Comment, CommentsCursorPaginationResponse } from '@entities';
import { PrismaService } from 'prismaService';

export class QueryHandlerBase {
  querybus: QueryBus;
  constructor(querybus: QueryBus) {
    this.querybus = querybus;
  }

  async validateCommentsQuery(contentId: string, userId: string) {
    // TODO: check for block secenario
    return true;
  }
}

@QueryHandler(GetCommentsByContentId)
export class GetCommentsByContentIdQueryHandler
  extends QueryHandlerBase
  implements IQueryHandler<GetCommentsByContentId>
{
  constructor(
    private readonly repo: CommentsRepository,
    querybus: QueryBus,
    private prisma: PrismaService,
  ) {
    super(querybus);
  }

  async execute({
    contentId,
    userId,
    cursor,
    take,
  }: GetCommentsByContentId): Promise<CommentsCursorPaginationResponse> {
    await this.validateCommentsQuery(contentId, userId);
    const friendsScores = await this.querybus.execute<
      GetUserFriendsIdsQuery,
      { id: string; score: number }[]
    >(new GetUserFriendsIdsQuery(userId));

    const countPromise = this.prisma.comment.count({
      where: {
        hostId: contentId,
      },
    });

    const res = await this.prisma.comment.findMany({
      where: {
        hostId: contentId,
      },
      take,
    });

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

    const comments = cursor
      ? sortedComments.splice(
          sortedComments.findIndex((v) => v.id === cursor),
          take + 1,
        )
      : sortedComments.splice(0, take);

    const countRes = await countPromise;
    return {
      cursor,
      data: comments,
      hasMore: comments.length > take,
      nextCursor: comments.at(comments.length - 1).id,
    };
  }
}
