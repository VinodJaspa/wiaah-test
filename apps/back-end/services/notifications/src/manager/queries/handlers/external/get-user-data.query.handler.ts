import { NotifciationsBaseQueryHandler } from '@manager/abstraction';
import { GetUserDataQuery, GetUserDataQueryRes } from '@manager/queries/impl';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAccountByIdMessage, GetAccountByIdMessageReply } from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES } from 'nest-utils';

@QueryHandler(GetUserDataQuery)
export class GetUserDataQueryHandler
  extends NotifciationsBaseQueryHandler
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

    const { email, firstName, preferedCurrency } = data;
    return {
      email,
      id,
      name: firstName,
      currency: preferedCurrency,
    };
  }
}
