import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { AddToDate, KAFKA_EVENTS, SERVICES } from 'nest-utils';
import {
  OrderItemRefundablePeriodOverEvent,
  SellerProductsPurchasedEvent,
} from 'nest-dto';
import { PrismaService } from '@prisma-service';
import { Cron, CronExpression } from '@nestjs/schedule';

const triggerEvents = {
  prodRefundOver: KAFKA_EVENTS.ORDERS_EVENTS.orderItemRefundPeriodOver(),
};

type triggerEvents = typeof triggerEvents;

@Controller()
export class EventSchedulingController {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.EVENT_SCHEDULING.token)
    private readonly eventClient: ClientKafka,
  ) {}

  @EventPattern(KAFKA_EVENTS.BILLING_EVNETS.sellerProductsPurchased('*', true))
  async handleProductPurchasedMakeUnrefundable(
    @Payload() { value }: { value: SellerProductsPurchasedEvent },
  ) {
    const res = await Promise.all(
      value.input.products.map((v) =>
        this.prisma.event.create({
          data: {
            triggerEvent: triggerEvents.prodRefundOver,
            triggerAt: AddToDate(new Date(), { days: 15 }),
            data: new OrderItemRefundablePeriodOverEvent({
              itemId: v.id,
            }).toString(),
          },
        }),
      ),
    );
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async handleDailyEventPublishing() {
    const currHour = new Date().getHours();
    const thisPeriod =
      currHour >= 12
        ? new Date(new Date().setHours(12))
        : new Date(new Date().setHours(0));

    const events = await this.prisma.event.findMany({
      where: {
        AND: [
          {
            triggerAt: {
              gte: thisPeriod,
            },
          },
          {
            triggerAt: {
              lte: AddToDate(thisPeriod, { hours: 12 }),
            },
          },
        ],
      },
    });

    events.forEach(({ data, triggerEvent }) => {
      const obj = this.eventFinder(triggerEvent as keyof triggerEvents, data);

      if (!obj) return;

      this.eventClient.emit(triggerEvent, obj);
    });
  }

  eventFinder(event: keyof triggerEvents, data: string) {
    switch (event) {
      case triggerEvents.prodRefundOver:
        return new OrderItemRefundablePeriodOverEvent(JSON.parse(data));

      default:
        break;
    }
  }
}
