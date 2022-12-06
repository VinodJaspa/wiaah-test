import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@products/queries/abstraction';
import { GetUserDataQuery, GetUserDataQueryRes } from '@products/queries/impl';
import { GetAccountByIdMessage, GetAccountByIdMessageReply } from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES } from 'nest-utils';

@QueryHandler(GetUserDataQuery)
export class GetUserDataQueryHandler
  extends BaseQueryHandler
  implements IQueryHandler<GetUserDataQuery>
{
  async execute({ id }: GetUserDataQuery): Promise<GetUserDataQueryRes> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetAccountByIdMessage,
      GetAccountByIdMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAccountById,
      new GetAccountByIdMessage({ accountId: id }),
    );

    if (!success) return null;
    return {
      email: data.email,
      name: data.firstName,
    };
  }
}
