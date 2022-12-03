import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { KafkaMessageHandler, KAFKA_MESSAGES, SERVICES } from 'nest-utils';
import { GetAffiliationItemSellerIdQuery } from '@affiliation/queries/impl';
import { ClientKafka } from '@nestjs/microservices';
import { GetItemSellerIdMessage, GetItemSellerIdMessageReply } from 'nest-dto';

@QueryHandler(GetAffiliationItemSellerIdQuery)
export class GetAffiliationItemSellerIdQueryHandler
  implements IQueryHandler<GetAffiliationItemSellerIdQuery>
{
  constructor(
    @Inject(SERVICES.AFFILIATION_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async execute({
    id,
    type,
  }: GetAffiliationItemSellerIdQuery): Promise<string> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetItemSellerIdMessage,
      GetItemSellerIdMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.SELLER_MESSAGES.getItemSellerId(type),
      new GetItemSellerIdMessage({
        id,
        type,
      }),
    );
    if (!success || typeof data !== 'string')
      throw new InternalServerErrorException();
    return data;
  }
}
