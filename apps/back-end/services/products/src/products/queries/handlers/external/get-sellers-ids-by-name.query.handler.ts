import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@products/queries/abstraction';
import {
  GetSellersIdsByNameQuery,
  GetSellersIdsByNameQueryRes,
} from '@products/queries/impl';
import {
  GetAccountsbyNameQueryMessage,
  GetAccountsByNameQueryMessageReply,
} from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES } from 'nest-utils';

@QueryHandler(GetSellersIdsByNameQuery)
export class GetSellersIdsByNameQueryHandler
  extends BaseQueryHandler
  implements IQueryHandler<GetSellersIdsByNameQuery>
{
  async execute({
    name,
    pagination,
  }: GetSellersIdsByNameQuery): Promise<GetSellersIdsByNameQueryRes> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetAccountsbyNameQueryMessage,
      GetAccountsByNameQueryMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAccountByName(),
      new GetAccountsbyNameQueryMessage({
        nameQuery: name,
        pagination: {
          skip: pagination.page * pagination.take,
          take: pagination.take,
        },
      }),
    );

    if (!success || !data) return { ids: [] };

    return {
      ids: data.accounts.map((v) => v.id),
    };
  }
}
