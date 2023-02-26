import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  BillingPriceCreatedEvent,
  CanPreformProductActionMessage,
  CanPreformProductActionMessageReply,
  GetUserMembershipPriceIdMessage,
  GetUserMembershipPriceIdMessageReply,
  SubscriptionPaidEvent,
} from 'nest-dto';
import { AddToDate, KAFKA_EVENTS, KAFKA_MESSAGES } from 'nest-utils';

import { MigrateMembershipTurnoverRulePriceIdCommand } from '@membership/commands';
import { GetMembershipPlanByIdQuery } from '@membership/queries';
import { MembershipType } from '@membership/types';
import {
  membershipPreformAction,
  MembershipPricesType,
} from '@membership/const';
import { Membership } from './entities';
import { CommissionOn } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Controller()
export class MembershipController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly prisma: PrismaService,
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

  @EventPattern(KAFKA_EVENTS.BILLING_EVNETS.billingSubscriptionPaid('*', true))
  async handleMembershipSubscribed(
    @Payload() { value }: { value: SubscriptionPaidEvent },
  ) {
    const membership = await this.prisma.membership.findUnique({
      where: {
        id: value.input.id,
      },
    });

    const endAt = AddToDate(new Date(), { days: membership.recurring });

    await this.prisma.memberShipSubscription.upsert({
      where: {
        userId: value.input.userId,
      },
      create: {
        endAt,
        startAt: new Date(),
        userId: value.input.userId,
        membershipId: value.input.id,
      },
      update: {
        membershipId: value.input.id,
        endAt,
        startAt: new Date(),
      },
    });
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

    const canPreform = membership.commissionOn === CommissionOn.external_click;
    return new CanPreformProductActionMessageReply({
      success: true,
      data: canPreform,
      error: null,
    });
  }
}
