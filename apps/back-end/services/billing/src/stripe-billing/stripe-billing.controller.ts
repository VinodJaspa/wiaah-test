import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  MembershipCreatedEvent,
  MembershipUpdatedEvent,
  SellerAccountCreatedEvent,
  SellerRevenueIncreasedEvent,
} from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import {
  CreateStripeCustomerCommand,
  CreateStripeMonthlyPriceCommand,
  CreateStripeProductCommand,
  CreateStripeTieredPriceCommand,
  StripeProductCommandRes,
  UpdateMembershipUsageCommand,
} from '@stripe-billing/commands/impl';
import { ProductTypeEnum } from './const';

@Controller()
export class StripeBillingController {
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.sellerAccountCreated)
  handleSellerAccountCreated(
    @Payload() { value }: { value: SellerAccountCreatedEvent },
  ) {
    this.commandBus.execute<CreateStripeCustomerCommand>(
      new CreateStripeCustomerCommand(
        value.input.email,
        `${value.input.firstName} ${value.input.lastName}`,
        value.input.id,
      ),
    );
  }

  @EventPattern(KAFKA_EVENTS.MEMBERSHIP.memberShipCreated)
  async handleNewMembership(
    @Payload() { value }: { value: MembershipCreatedEvent },
  ) {
    console.log('created member', JSON.stringify(value, null, 2));
    const stripeProduct = await this.commandBus.execute<
      CreateStripeProductCommand,
      StripeProductCommandRes
    >(
      new CreateStripeProductCommand({
        name: value.input.name,
        productId: value.input.id,
        type: ProductTypeEnum.membership,
      }),
    );

    this.commandBus.execute<CreateStripeMonthlyPriceCommand>(
      new CreateStripeMonthlyPriceCommand({
        priceInCents: value.input.price,
        productOgId: value.input.id,
        productType: ProductTypeEnum.membership,
        stripeProductId: stripeProduct.stripeProductId,
      }),
    );
  }
  @EventPattern(KAFKA_EVENTS.SELLER.revenueIncreased)
  handleSellerRevenueIncreased(
    @Payload() { value }: { value: SellerRevenueIncreasedEvent },
  ) {
    this.commandBus.execute<UpdateMembershipUsageCommand>(
      new UpdateMembershipUsageCommand('', value.input.allTimeRevenue),
    );
  }

  // @EventPattern(KAFKA_EVENTS.MEMBERSHIP.memberShipModified)
  // handleUpdatedMembership(
  //   @Payload() { value }: { value: MembershipUpdatedEvent },
  // ) {
  //   this.commandBus.execute<CreateStripeProductCommand>(
  //     new CreateStripeProductCommand(
  //       value.input.name,
  //       value.input.id,
  //       'membership',
  //     ),
  //   );
  // }
}
