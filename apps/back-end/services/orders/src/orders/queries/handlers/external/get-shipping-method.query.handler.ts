import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@orders/abstraction';
import {
  GetShippingMethodQuery,
  ShippingMethodQueryRes,
} from '@orders/queries/impl';
import {
  GetShippingAddressMessageReply,
  GetShippingMethodMessage,
  GetShippingMethodMessageReply,
} from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES } from 'nest-utils';
import { PrismaService } from 'prismaService';

@QueryHandler(GetShippingMethodQuery)
export class GetShippingMethodQueryHandler
  extends BaseQueryHandler
  implements IQueryHandler<GetShippingMethodQuery>
{
  async execute({
    id,
  }: GetShippingMethodQuery): Promise<ShippingMethodQueryRes> {
    const {
      results: { data, success },
    } = await KafkaMessageHandler<
      string,
      GetShippingMethodMessage,
      GetShippingMethodMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.SHIPPING_MESSAGES.getShippingMethod(),
      new GetShippingMethodMessage({ id }),
    );
    if (!success) return null;
    const { cost, name } = data;

    return { cost, name };
  }
}
