import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetAccountsbyNameQueryMessage,
  GetAccountsByNameQueryMessageReply,
} from 'nest-dto';
import {
  ExtractPagination,
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { GetUserIdsByNameQuery, GetUserIdsByNameQueryRes } from '../impl';

@QueryHandler(GetUserIdsByNameQuery)
export class GetUserIdByNameQueryHandler
  implements IQueryHandler<GetUserIdsByNameQuery>
{
  constructor(
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async execute({
    name,
    pagination,
  }: GetUserIdsByNameQuery): Promise<GetUserIdsByNameQueryRes> {
    const { take, skip } = ExtractPagination(pagination);
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetAccountsbyNameQueryMessage,
      GetAccountsByNameQueryMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAccountsByName(),
      new GetAccountsbyNameQueryMessage({
        nameQuery: name,
        pagination: {
          skip,
          take,
        },
      }),
    );

    if (!success) [];

    return { ids: data.accounts.map((v) => v.id) };
  }
}
