import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { OrderCanceledEvent } from '../impl';
import { OrderCanceledEvent as KafkaOrderCanceledEvent } from 'nest-dto';
import { OrderStatus } from '@orders/const';

@EventsHandler(OrderCanceledEvent)
export class OrderCanceledEventHandler
  implements IEventHandler<OrderCanceledEvent>
{
  constructor(
    @Inject(SERVICES.ORDERS_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  handle({ order }: OrderCanceledEvent) {
    const orderTotal = order.items.reduce((acc,v)=> {
      return acc 
    },0)

    // this.eventClient.emit(
    //   KAFKA_EVENTS.ORDERS_EVENTS.orderCanceled(),
    //   new KafkaOrderCanceledEvent({
    //     buyerId: order.buyerId,
    //     discountId: order.discountId,
    //     products: order.items.map(({ id, qty }) => ({ id, qty })),
    //     sellerId: order.sellerId,
    //     status: order.status as unknown as string,
    //     shippingMethodId: order.shippingMethodId,
    //     total:orderTotal,
    //     shippingFee
    //   }),
    // );
  }
}
