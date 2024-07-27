import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NewAccountCreatedEvent, OrderCreatedEvent } from 'nest-dto';
import { accountType, KAFKA_EVENTS } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { AnalyticsEvents } from './const';

@Controller()
export class EventsController {
  constructor(private readonly prisma: PrismaService) { }

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated(accountType.SELLER))
  async handleSellerCreated(
    @Payload() { value }: { value: NewAccountCreatedEvent },
  ) {
    await this.createEvent(AnalyticsEvents.sellerCreated, value.input.id);
  }

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated(accountType.BUYER))
  async handleBuyerCreated(
    @Payload() { value }: { value: NewAccountCreatedEvent },
  ) {
    await this.createEvent(AnalyticsEvents.buyerCreated, value.input.id);
  }

  @EventPattern(KAFKA_EVENTS.ORDERS_EVENTS.orderCreated())
  async handleOrderCreated(@Payload() { value }: { value: OrderCreatedEvent }) {
    await this.createEvent(
      AnalyticsEvents.orderCreated,
      value.input.order.id,
      value.input.buyer.id,
    );
  }

  private async createEvent(
    key: AnalyticsEvents,
    causedToId: string,
    causedById?: string,
  ) {
    try {
      await this.prisma.event.create({
        data: {
          key,
          causedToId,
          causedById,
        },
      });
    } catch (error) {
      // Handle error, log it, etc.
      console.error(`Failed to create event: ${key}`, error);
    }
  }
}
