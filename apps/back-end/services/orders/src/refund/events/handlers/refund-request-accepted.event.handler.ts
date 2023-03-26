import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import {
  OrderRefundRequestAcceptedEvent,
  CreateScheduledEvent,
} from 'nest-dto';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { RefundRequestCreatedEvent } from '../impl';

@EventsHandler(RefundRequestCreatedEvent)
export class RefundRequestRejectedEventHandler
  implements IEventHandler<RefundRequestCreatedEvent>
{
  constructor(
    @Inject(SERVICES.ORDERS_SERVICE.token)
    private readonly eventClinet: ClientKafka,
  ) {}

  async handle({ refund }: RefundRequestCreatedEvent) {
    this.eventClinet.emit(
      KAFKA_EVENTS.ORDERS_EVENTS.orderRefundRequestAccepted(),
      new OrderRefundRequestAcceptedEvent({
        amount: refund.amount,
        buyerId: refund.requestedById,
        sellerId: refund.sellerId,
        productId: refund.id,
      }),
    );
  }
}
