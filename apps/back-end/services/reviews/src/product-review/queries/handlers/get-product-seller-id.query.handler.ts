import { Inject, InternalServerErrorException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { GetProductSellerIdQuery } from '@product-review/queries/impl';
import {
  GetProductSellerIdMessage,
  GetProductSellerIdMessageReply,
} from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES, SERVICES } from 'nest-utils';

@QueryHandler(GetProductSellerIdQuery)
export class GetProductSellerIdQueryHandler
  implements IQueryHandler<GetProductSellerIdQuery>
{
  constructor(
    @Inject(SERVICES.REVIEWS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async execute({ productId }: GetProductSellerIdQuery): Promise<any> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetProductSellerIdMessage,
      GetProductSellerIdMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.REVIEW_SERVICE.getProductSellerId,
      new GetProductSellerIdMessage({
        productId,
      }),
    );

    if (!success || !data || !data.sellerId)
      throw new InternalServerErrorException();

    return data.sellerId;
  }
}
