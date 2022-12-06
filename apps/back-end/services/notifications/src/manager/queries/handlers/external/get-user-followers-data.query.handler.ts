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
      new GetUserFollowersData({ userId: id }),
    );
    if (!success) return null;

    return data.map((v) => ({ id: v.id }));
  }
}
