import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetUserFollowersIdsQuery,
  GetUserFollowersIdsQueryRes,
} from '@manager/queries/impl';
import { NotifciationsBaseQueryHandler } from '@manager/abstraction';
import { KafkaMessageHandler, KAFKA_MESSAGES } from 'nest-utils';
import { GetUserFollowersData, GetUserFollowersDataReply } from 'nest-dto';

@QueryHandler(GetUserFollowersIdsQuery)
export class GetUserFollowersIdsQueryHandler
  extends NotifciationsBaseQueryHandler
  implements IQueryHandler<GetUserFollowersIdsQuery>
{
  async execute({
    id,
  }: GetUserFollowersIdsQuery): Promise<GetUserFollowersIdsQueryRes> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetUserFollowersData,
      GetUserFollowersDataReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.SOCIAL_MESSAGES.getUserFollowsData(),
      new GetUserFollowersData({
        userId: id,
        pagination: { page: 1, take: 10 },
      }),
    );
    if (!success) return null;

    return data.ids.map((v) => ({ id: v }));
  }
}
