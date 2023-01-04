import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetServiceMetaDataMessage,
  GetServiceMetaDataMessageReply,
} from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES, SERVICES } from 'nest-utils';
import { GetServiceMetadataQuery, GetServiceMetadataQueryRes } from '../impl';

@QueryHandler(GetServiceMetadataQuery)
export class GetServiceMetadataQueryHandler
  implements IQueryHandler<GetServiceMetadataQuery>
{
  constructor(
    @Inject(SERVICES.ANALYTICS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async execute({
    serviceId,
    userId,
  }: GetServiceMetadataQuery): Promise<GetServiceMetadataQueryRes> {
    const {
      results: { data, success },
    } = await KafkaMessageHandler<
      string,
      GetServiceMetaDataMessage,
      GetServiceMetaDataMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.SERVICES_MESSAGES.getServiceMetaData,
      new GetServiceMetaDataMessage({ serviceId, userId }),
    );

    if (!success) {
      return {
        keywords: [],
      };
    }

    return {
      keywords: data.keywords,
    };
  }
}
