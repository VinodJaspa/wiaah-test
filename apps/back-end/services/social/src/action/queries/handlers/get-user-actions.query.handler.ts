import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserActionsQuery } from '@action/queries';
import { Action, GetActionsCursorResponse } from '@action/entities';
import { ActionRepository } from '@action/repository';
import { PrismaService } from 'prismaService';

@QueryHandler(GetUserActionsQuery)
export class GetUserActionsQueryHandler
  implements IQueryHandler<GetUserActionsQuery>
{
  constructor(
    private readonly repo: ActionRepository,
    private readonly primsa: PrismaService,
  ) {}

  async execute({
    args: { take, userId, cursor },
  }: GetUserActionsQuery): Promise<GetActionsCursorResponse> {
    const res = await this.primsa.action.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      cursor: {
        id: cursor,
      },
      take: take + 1,
    });

    return {
      cursor,
      data: res.length > take ? res.slice(0, res.length - 2) : res,
      hasMore: res.length > take,
      nextCursor: res.at(res.length - 1)?.id,
    };
  }
}
