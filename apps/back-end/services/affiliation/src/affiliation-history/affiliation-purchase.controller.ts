import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KAFKA_EVENTS } from 'nest-utils';
import {
  AffiliatedProductPurchasedEvent,
  OrderItemBillingReadyEvent,
} from 'nest-dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAffiliationPurchaseCommand } from './commands';
import { PrismaService } from 'prismaService';

@Controller()
export class AffiliationPurchaseController {
  constructor(
    private readonly commandbus: CommandBus,
    private prisma: PrismaService,
  ) {}

  @EventPattern(KAFKA_EVENTS.AFFILIATION.affiliatedProductPurchased)
  async handleAffiliatedPurchase(
    @Payload() { value }: { value: AffiliatedProductPurchasedEvent },
  ) {
    const {
      input: {
        affiliatorId,
        itemId,
        itemSellerId,
        itemType,
        purchaserId,
        affiliationId,
        paidPrice,
      },
    } = value;

    const res = await this.prisma.affiliation.findUnique({
      where: {
        id: affiliationId,
      },
    });

    if (!res) return;

    const percent = res.commision;

    const amount = paidPrice * (percent / 100);

    return this.commandbus.execute<CreateAffiliationPurchaseCommand>(
      new CreateAffiliationPurchaseCommand({
        affiliatorId,
        itemId,
        itemType,
        sellerId: itemSellerId,
        purchaserId,
        paidCommissionAmount: amount,
        paidCommissionPercent: percent,
      }),
    );
  }

  @EventPattern(KAFKA_EVENTS.ORDERS_EVENTS.orderItemBillingReady())
  async handleOrderItemBilling(
    @Payload() { value }: { value: OrderItemBillingReadyEvent },
  ) {
    if (value.input.affiliatorId && value.input.affiliationAmount) {
      this.commandbus.execute<CreateAffiliationPurchaseCommand>(
        new CreateAffiliationPurchaseCommand({
          affiliatorId: value.input.affiliatorId,
          itemId: value.input.itemId,
          itemType: 'product',
          sellerId: value.input.sellerId,
          purchaserId: value.input.buyerId,
          paidCommissionAmount: value.input.affiliationAmount,
          paidCommissionPercent:
            value.input.affiliationAmount / value.input.paidPrice,
        }),
      );
    }
  }
}
