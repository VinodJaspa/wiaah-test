import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetServiceMetaDataMessage,
  GetServiceMetaDataMessageReply,
} from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES, SERVICES } from 'nest-utils';
import {
  GetServiceDataQuery,
  GetServiceDataQueryRes,
} from '../impl/get-service-data.query';

@QueryHandler(GetServiceDataQuery)
export class GetServiceDataQueryHandler
  implements IQueryHandler<GetServiceDataQuery>
{
  constructor(
    @Inject(SERVICES.MAILING_SERVICE.token)
    private eventClient: ClientKafka,
  ) {}

  async execute({
    id,
    userId,
  }: GetServiceDataQuery): Promise<GetServiceDataQueryRes> {
    const res = await KafkaMessageHandler<
      string,
      GetServiceMetaDataMessage,
      GetServiceMetaDataMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.SERVICES_MESSAGES.getServiceMetaData,
      new GetServiceMetaDataMessage({
        serviceId: id,
        userId,
      }),
    );

    if (!res.results.success) return null;

    return {
      name: res.results.data.name,
    };
  }
}
