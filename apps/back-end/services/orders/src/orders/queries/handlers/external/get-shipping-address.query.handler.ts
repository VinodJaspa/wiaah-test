import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@orders/abstraction';
import {
  GetShippingAddressQuery,
  ShippingAddressQueryRes,
} from '@orders/queries/impl';
import {
  GetShippingAddressMessage,
  GetShippingAddressMessageReply,
} from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES } from 'nest-utils';
import { PrismaService } from 'prismaService';

@QueryHandler(GetShippingAddressQuery)
export class GetShippingAddressCommandHandler
  extends BaseQueryHandler
  implements IQueryHandler<GetShippingAddressQuery>
{
  async execute({
    id,
  }: GetShippingAddressQuery): Promise<ShippingAddressQueryRes> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetShippingAddressMessage,
      GetShippingAddressMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.SHIPPING_MESSAGES.getShippingAddress(),
      new GetShippingAddressMessage({
        id,
      }),
    );

    if (!success || !data) return null;
    const {
      address,
      address2,
      city,
      coords: { lat, lon },
      country,
      state,
      ownerId,
    } = data;
    return {
      country,
      state,
      city,
      address,
      coords: { lat, long: lon },
      address_full: `${address}, ${state}, ${city}, ${country}`,
      ownerId,
    };
  }
}
