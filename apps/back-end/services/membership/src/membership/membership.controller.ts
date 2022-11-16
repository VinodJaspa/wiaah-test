import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  BillingPriceCreatedEvent,
  CanPreformProductActionMessage,
  CanPreformProductActionMessageReply,
  GetUserMembershipPriceIdMessage,
  GetUserMembershipPriceIdMessageReply,
} from 'nest-dto';
import { KAFKA_EVENTS, KAFKA_MESSAGES } from 'nest-utils';

import { MigrateMembershipTurnoverRulePriceIdCommand } from '@membership/commands';
import { GetMembershipPlanByIdQuery } from '@membership/queries';
import { MembershipType } from '@membership/types';
import {
  membershipPreformAction,
  MembershipPricesType,
  membershipType,
  membershipUnitType,
} from '@membership/const';
import { Membership } from './entities';

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

  @MessagePattern(
    KAFKA_MESSAGES.CAN_PREFORM_ACTION_MESSAGES.canPreformProductAction(
      membershipPreformAction.vendor_stie_click,
    ),
  )
  async handleVendorSiteClickAction(
    @Payload() { value }: { value: CanPreformProductActionMessage },
  ) {
    const membership = await this.queryBus.execute<
      GetMembershipPlanByIdQuery,
      Membership
    >(new GetMembershipPlanByIdQuery(value.input.seller.membershipId));

    const canPreform =
      membership.type === membershipType.per_unit &&
      membership.unit_type === membershipUnitType.vendor_site_click;
    return new CanPreformProductActionMessageReply({
      success: true,
      data: canPreform,
      error: null,
    });
  }
}
