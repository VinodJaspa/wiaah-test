import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserFriendsIdsQuery } from '@comments/queries/impl';
import { Inject } from '@nestjs/common';
import { KafkaMessageHandler, KAFKA_MESSAGES, SERVICES } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetUsersInteractionsByUserIdMessage,
  GetUsersInteractionsByUserIdMessageReply,
} from 'nest-dto';

@QueryHandler(GetUserFriendsIdsQuery)
export class GetUserFriendsIdsQueryHandler
  implements IQueryHandler<GetUserFriendsIdsQuery>
{
  constructor(
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async execute({
    userId,
  }: GetUserFriendsIdsQuery): Promise<{ id: string; score: number }[]> {
    const {
      results: { data, success },
    } = await KafkaMessageHandler<
      string,
      GetUsersInteractionsByUserIdMessage,
      GetUsersInteractionsByUserIdMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.ANALYTICS_MESSAGES.getUsersInteractionsByUserId(),
      new GetUsersInteractionsByUserIdMessage({
        userId,
      }),
    );

    if (!success || !data) return [];

    return data.users;
  }
}
