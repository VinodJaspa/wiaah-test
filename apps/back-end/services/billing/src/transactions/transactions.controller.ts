import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { OrderCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { PrismaService } from 'prismaService';
@Controller()
export class TransactionsController {
  constructor(private readonly prisma: PrismaService) {}

  @EventPattern(KAFKA_EVENTS.ORDERS_EVENTS.orderCreated('*', true))
  async handleOrderCreated(@Payload() { value }: { value: OrderCreatedEvent }) {
    try {
      await this.prisma.transaction.create({
        data: {
          amount: value.input.order.bills.paid,
          fromId: value.input.buyer.id,
          userId: value.input.seller.id,
          paymentType: value.input.order.payment.type,
          description: `Purchased Order`,
          currency: value.input.order.bills.paidCurrency,
        },
      });
    } catch {}
  }
}
