import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersActivityScoresQuery } from '@comments/queries/impl';
import { Inject } from '@nestjs/common';
import { KafkaMessageHandler, KAFKA_MESSAGES, SERVICES } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetUsersActivityScoresMessage,
  GetUsersActivityScoresMessageReply,
} from 'nest-dto';

@QueryHandler(GetUsersActivityScoresQuery)
export class GetUsersActivityScoresQueryHandler
  implements IQueryHandler<GetUsersActivityScoresQuery>
{
  constructor(
    @Inject(SERVICES.SOCIAL_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async execute({
    userIds,
  }: GetUsersActivityScoresQuery): Promise<{ id: string; score: number }[]> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetUsersActivityScoresMessage,
      GetUsersActivityScoresMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.ANALYTICS_MESSAGES.getUsersActivityScoresByIds(),
      new GetUsersActivityScoresMessage({ usersIds: userIds }),
    );

    if (!success || !data) return [];

    return data.users;
  }
}
