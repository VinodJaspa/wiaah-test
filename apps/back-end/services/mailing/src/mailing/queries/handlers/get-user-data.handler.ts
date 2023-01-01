import { BaseQueryHandler } from '@mailing/abstraction';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserDataQuery, GetUserDataQueryRes } from '@mailing/queries/impl';
import { KafkaMessageHandler, KAFKA_MESSAGES } from 'nest-utils';
import { GetAccountByIdMessage, GetAccountByIdMessageReply } from 'nest-dto';

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
      id,
      name: data.firstName,
    };
  }
}
