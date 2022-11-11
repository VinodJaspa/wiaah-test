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
  CreateStripeProductCommand,
  UpdateMembershipUsageCommand,
} from './commands';

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
  handleNewMembership(@Payload() { value }: { value: MembershipCreatedEvent }) {
    this.commandBus.execute<CreateStripeProductCommand>(
      new CreateStripeProductCommand(
        value.input.name,
        value.input.id,
        'membership',
      ),
    );
  }

  @EventPattern(KAFKA_EVENTS.MEMBERSHIP.memberShipModified)
  handleUpdatedMembership(
    @Payload() { value }: { value: MembershipUpdatedEvent },
  ) {
    this.commandBus.execute<CreateStripeProductCommand>(
      new CreateStripeProductCommand(
        value.input.name,
        value.input.id,
        'membership',
      ),
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
}
