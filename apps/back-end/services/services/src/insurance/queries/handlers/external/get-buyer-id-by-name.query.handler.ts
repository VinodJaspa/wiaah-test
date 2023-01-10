import { InsuranceBaseQueryHandler } from '@insurance/abstraction';
import {
  GetAccountIdsByNameQuery,
  GetAccountIdsByNameQueryRes,
} from '@insurance/queries/impl';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetAccountsbyNameQueryMessage,
  GetAccountsByNameQueryMessageReply,
} from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES } from 'nest-utils';

@QueryHandler(GetAccountIdsByNameQuery)
export class GetAccountIdsByNameQueryHandler
  extends InsuranceBaseQueryHandler
  implements IQueryHandler<GetAccountIdsByNameQuery>
{
  async execute({
    name,
    pagination,
    type,
  }: GetAccountIdsByNameQuery): Promise<GetAccountIdsByNameQueryRes> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetAccountsbyNameQueryMessage,
      GetAccountsByNameQueryMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAccountsByName(type),
      new GetAccountsbyNameQueryMessage({
        nameQuery: name,
        pagination: {
          take: pagination.take,
          skip: pagination.page * pagination.take,
        },
      }),
    );

    if (!success) return [];

    return data.accounts.map((v) => ({ id: v.id }));
  }
}
