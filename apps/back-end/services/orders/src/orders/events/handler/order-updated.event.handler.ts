import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BaseEventHandler } from '@orders/abstraction';
import { OrderStatus } from '@orders/const';
import { OrderUpdatedEvent } from '@orders/events/impl';
import { GetUserDataQuery, GetUserDataQueryRes } from '@orders/queries';
import { OrderShippingEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';

@EventsHandler(OrderUpdatedEvent)
export class OrderStatusUpdatedEventHandler
  extends BaseEventHandler
  implements IEventHandler<OrderUpdatedEvent>
{
  async handle({ order }: OrderUpdatedEvent) {
    switch (order.status.of) {
      case OrderStatus.shipping:
        const getSeller = this.querybus.execute<
          GetUserDataQuery,
          GetUserDataQueryRes
        >(new GetUserDataQuery(order.sellerId));
        const getBuyer = this.querybus.execute<
          GetUserDataQuery,
          GetUserDataQueryRes
        >(new GetUserDataQuery(order.buyerId));

        const seller = await getSeller;
        const buyer = await getBuyer;
        this.eventClient.emit(
          KAFKA_EVENTS.SHIPPING_EVENTS.orderShippingStarted(),
          new OrderShippingEvent({
            seller: {
              id: order.sellerId,
              email: seller.email,
              name: seller.name,
            },
            buyer: {
              id: order.buyerId,
              email: buyer.email,
              name: buyer.name,
            },
            order: {
              id: order.id,
              orderedAt: new Date(order.createdAt).toISOString(),
            },
          }),
        );
        break;

      default:
        break;
    }
  }
}
