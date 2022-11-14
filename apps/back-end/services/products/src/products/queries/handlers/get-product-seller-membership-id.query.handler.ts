import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { GetProductSellerMembershipIdQuery } from '@products/queries/impl';
import {
  GetSellerMembershipIdMessage,
  GetSellerMembershipIdMessageReply,
} from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES, SERVICES } from 'nest-utils';

@QueryHandler(GetProductSellerMembershipIdQuery)
export class GetProductSellerMembershipIdQueryHandler
  implements IQueryHandler<GetProductSellerMembershipIdQuery>
{
  constructor(
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async execute({
    sellerId,
  }: GetProductSellerMembershipIdQuery): Promise<string> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetSellerMembershipIdMessage,
      GetSellerMembershipIdMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.SELLER_MESSAGES.getSellerMembership,
      new GetSellerMembershipIdMessage({ sellerId }),
    );
    if (!success) return null;
    return data.membershipId;
  }
}
