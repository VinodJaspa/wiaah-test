import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserFollowersData, GetUserFollowersDataReply } from 'nest-dto';
import {
  KafkaMessageHandler,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import {
  GetAccountSocialFollowersCountQuery,
  GetAccountSocialFollowersCountQueryRes,
} from '../impl';

QueryHandler(GetAccountSocialFollowersCountQuery);
export class GetAccountSocialFollowersCountQueryHandler
  implements IQueryHandler<GetAccountSocialFollowersCountQuery>
{
  constructor(
    @Inject(SERVICES.ACCOUNTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async execute({
    userId,
  }: GetAccountSocialFollowersCountQuery): Promise<GetAccountSocialFollowersCountQueryRes> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetUserFollowersData,
      GetUserFollowersDataReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.SOCIAL_MESSAGES.getUserFollowsData(),
      new GetUserFollowersData({ userId, pagination: { page: 1, take: 1 } }),
    );

    if (success) {
      return {
        followers: data.total,
      };
    }

    return {
      followers: 0,
    };
  }
}
