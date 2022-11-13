import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  BillingPriceCreatedEvent,
  GetUserMembershipPriceIdMessage,
  GetUserMembershipPriceIdMessageReply,
} from 'nest-dto';
import { KAFKA_EVENTS, KAFKA_MESSAGES } from 'nest-utils';

import { MigrateMembershipTurnoverRulePriceIdCommand } from '@membership/commands';
import { GetMembershipPlanByIdQuery } from '@membership/queries';
import { MembershipType } from '@membership/types';
import { MembershipPricesType } from '@membership/const';

@Controller()
export class MembershipController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @EventPattern(
    KAFKA_EVENTS.BILLING_EVNETS.billingPriceCreated(
      MembershipPricesType.turnover,
    ),
  )
  handleUpdateMembershipPricing(
    @Payload() { value }: { value: BillingPriceCreatedEvent },
  ) {
    this.commandBus.execute<MigrateMembershipTurnoverRulePriceIdCommand>(
      new MigrateMembershipTurnoverRulePriceIdCommand(
        value.input.id,
        value.input.priceId,
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
          priceId: membership.turnover_rules.at(0).priceId,
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
