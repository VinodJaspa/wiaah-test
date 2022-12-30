import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { RefundRequestRejectedEvent } from '@refund/events/impl';
import { OrderRefundRequestRejectedEvent } from 'nest-dto';

@EventsHandler(RefundRequestRejectedEvent)
export class RefundRequestRejectedEventHandler
  implements IEventHandler<RefundRequestRejectedEvent>
{
  constructor(
    @Inject(SERVICES.ORDERS_SERVICE.token)
    private readonly eventClinet: ClientKafka,
  ) {}

  async handle({ refund }: RefundRequestRejectedEvent) {
    this.eventClinet.emit(
      KAFKA_EVENTS.ORDERS_EVENTS.orderRefundRequestRejected(),
      new OrderRefundRequestRejectedEvent({
        amount: refund.amount,
        buyerId: refund.requestedById,
        reason: refund.reason,
        sellerId: refund.sellerId,
        productId: refund.id,
      }),
    );
  }
}
