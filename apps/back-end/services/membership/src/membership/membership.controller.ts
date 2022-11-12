import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  GetUserMembershipPriceIdMessage,
  GetUserMembershipPriceIdMessageReply,
  StripeMembershipPricingCreatedEvent,
} from 'nest-dto';
import { KAFKA_EVENTS, KAFKA_MESSAGES } from 'nest-utils';

import { MigrateMembershipStripeIdCommand } from '@membership/commands/impl';
import { GetMembershipPlanByIdQuery } from './queries';
import { MembershipType } from './types';

@Controller()
export class MembershipController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @EventPattern(KAFKA_EVENTS.BILLING_EVNETS.stripeMembershipPricingCreated)
  handleUpdateMembershipPricing(
    @Payload() { value }: { value: StripeMembershipPricingCreatedEvent },
  ) {
    console.log('pricing created', JSON.stringify(value, null, 2));
    this.commandBus.execute<MigrateMembershipStripeIdCommand>(
      new MigrateMembershipStripeIdCommand(
        value.input.priceId,
        value.input.membershipId,
      ),
    );
  }

  @MessagePattern(KAFKA_MESSAGES.BILLING_MESSAGES.getUserMembershipPriceId)
  async handleGetPriceId(
    @Payload() { value }: { value: GetUserMembershipPriceIdMessage },
  ): Promise<GetUserMembershipPriceIdMessageReply> {
    try {
      const membershipPromise = this.queryBus.execute<
        GetMembershipPlanByIdQuery,
        MembershipType
      >(new GetMembershipPlanByIdQuery(value.input.membershipId));

      const membership = await membershipPromise;

      return new GetUserMembershipPriceIdMessageReply({
        success: true,
        data: {
          priceId: membership.turnover_rules.at(0).id,
        },
        error: null,
      });
    } catch (error) {
      return new GetUserMembershipPriceIdMessageReply({
        success: true,
        data: null,
        error,
      });
    }
  }
}
