import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KAFKA_EVENTS } from 'nest-utils';
import { AffiliatedProductPurchasedEvent } from 'nest-dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateAffiliationPurchaseCommand } from './commands';

@Controller()
export class AffiliationPurchaseController {
  constructor(private readonly commandbus: CommandBus) {}

  @EventPattern(KAFKA_EVENTS.AFFILIATION.affiliatedProductPurchased)
  handleAffiliatedPurchase(
    @Payload() { value }: { value: AffiliatedProductPurchasedEvent },
  ) {
    const {
      input: { affiliatorId, itemId, itemSellerId, itemType, purchaserId },
    } = value;

    return this.commandbus.execute<CreateAffiliationPurchaseCommand>(
      new CreateAffiliationPurchaseCommand({
        affiliatorId,
        itemId,
        itemType,
        sellerId: itemSellerId,
        purchaserId,
      }),
    );
  }
}
