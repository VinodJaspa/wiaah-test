import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@orders/abstraction';
import { GetProductsData, GetProductsDataRes } from '@orders/queries/impl';
import {
  GetProductsMetaDataMessage,
  GetProductsMetaDataMessageReply,
} from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES } from 'nest-utils';

@QueryHandler(GetProductsData)
export class GetProductsDataQueryHandler
  extends BaseQueryHandler
  implements IQueryHandler<GetProductsData>
{
  async execute({ ids }: GetProductsData): Promise<GetProductsDataRes> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetProductsMetaDataMessage,
      GetProductsMetaDataMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductsMetaData,
      new GetProductsMetaDataMessage({
        productsIds: ids,
      }),
    );
    if (!success) return null;

    return data.map((v) => ({
      sellerId: v.ownerId,
      price: v.price,
      tax: v.tax,
      thumbnail: v.thumbnail,
      title: v.title,
      id: v.productId,
      categories: v.category,
    }));
  }
}
