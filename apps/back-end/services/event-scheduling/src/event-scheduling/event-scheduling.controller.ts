import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AddToDate, KAFKA_EVENTS } from 'nest-utils';
import {
  OrderItemRefundablePeriodOverEvent,
  SellerProductsPurchasedEvent,
} from 'nest-dto';
import { PrismaService } from '@prisma-service';
import { Cron } from '@nestjs/schedule';

@Controller()
export class EventSchedulingController {
  constructor(private readonly prisma: PrismaService) {}

  @EventPattern(KAFKA_EVENTS.BILLING_EVNETS.sellerProductsPurchased('*', true))
  async handleProductPurchasedMakeUnrefundable(
    @Payload() { value }: { value: SellerProductsPurchasedEvent },
  ) {
    const res = await Promise.all(
      value.input.products.map((v) =>
        this.prisma.event.create({
          data: {
            triggerEvent: 'product.unrefundable',
            triggerAt: AddToDate(new Date(), { days: 15 }),
            data: new OrderItemRefundablePeriodOverEvent({
              productId: v.id,
            }).toString(),
          },
        }),
      ),
    );
  }

  @Cron(``)
  handleDailyEventPublishing() {}
}
