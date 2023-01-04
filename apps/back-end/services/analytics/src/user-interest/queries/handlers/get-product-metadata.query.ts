import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetProductMetaDataMessage,
  GetProductMetaDataMessageReply,
} from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES, SERVICES } from 'nest-utils';
import { GetProductMetadataQuery, GetProductMetadataQueryRes } from '../impl';

@QueryHandler(GetProductMetadataQuery)
export class GetProductMetadataQueryHandler
  implements IQueryHandler<GetProductMetadataQuery>
{
  constructor(
    @Inject(SERVICES.ANALYTICS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async execute({
    id,
    userId,
  }: GetProductMetadataQuery): Promise<GetProductMetadataQueryRes> {
    const {
      results: { data, success },
    } = await KafkaMessageHandler<
      string,
      GetProductMetaDataMessage,
      GetProductMetaDataMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductMetaData,
      new GetProductMetaDataMessage({ productId: id, userId }),
    );

    if (success) {
      return {
        keywords: data.keywords,
      };
    }

    return { keywords: [] };
  }
}
