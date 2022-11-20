import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { ReviewProductType } from '@product-review/const';
import {
  GetIsUserPurchasedProductMessage,
  GetIsUserPurchasedProductMessageReply,
} from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES, SERVICES } from 'nest-utils';
import { GetIsUserHavePurchasedProductQuery } from '../impl';

@QueryHandler(GetIsUserHavePurchasedProductQuery)
export class GetIsUserHavePurchasedProductQueryHandler
  implements IQueryHandler<GetIsUserHavePurchasedProductQuery>
{
  constructor(
    @Inject(SERVICES.REVIEWS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}
  async execute({
    productId,
    userId,
  }: GetIsUserHavePurchasedProductQuery): Promise<
    [boolean, { id: string; sellerId: string }]
  > {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetIsUserPurchasedProductMessage,
      GetIsUserPurchasedProductMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.REVIEW_SERVICE.getIsUserPurchasedProduct(
        ReviewProductType,
      ),
      new GetIsUserPurchasedProductMessage({
        userId,
        productId,
      }),
    );
    console.log('kafka res', { data, error, success });
    if (!success) throw new InternalServerErrorException();

    return [data.hasPurchased, data.product];
  }
}
