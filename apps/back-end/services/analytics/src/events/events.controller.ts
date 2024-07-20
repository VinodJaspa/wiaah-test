import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NewAccountCreatedEvent, OrderCreatedEvent } from 'nest-dto';
import { accountType, KAFKA_EVENTS } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { AnalyticsEvents } from './const';

@Controller()
export class EventsController {
  constructor(private readonly prisma: PrismaService) {}

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated(accountType.SELLER))
  async handleSellerCreated(
    @Payload() { value }: { value: NewAccountCreatedEvent },
  ) {
    const res = await this.prisma.event.create({
      data: {
        key: AnalyticsEvents.sellerCreated,
        causedToId: value.input.id,
      },
    });
  }

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated(accountType.BUYER))
  async handleBuyerCreated(
    @Payload() { value }: { value: NewAccountCreatedEvent },
  ) {
    const res = await this.prisma.event.create({
      data: {
        key: AnalyticsEvents.buyerCreated,
        causedToId: value.input.id,
      },
    });
  }

  @EventPattern(KAFKA_EVENTS.ORDERS_EVENTS.orderCreated())
  async handleOrderCreated(@Payload() { value }: { value: OrderCreatedEvent }) {
    const res = await this.prisma.event.create({
      data: {
        causedById: value.input.buyer.id,
        key: AnalyticsEvents.orderCreated,
        causedToId: value.input.order.id,
      },
    });
  }
}
