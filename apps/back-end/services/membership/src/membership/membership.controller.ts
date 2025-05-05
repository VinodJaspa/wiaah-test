import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  CanPreformProductActionMessage,
  CanPreformProductActionMessageReply,
  GetIsExternalSeller,
  GetIsExternalSellerReply,
  GetUserMembershipPriceIdMessage,
  GetUserMembershipPriceIdMessageReply,
  SubscriptionPaidEvent,
} from 'nest-dto';
import { KAFKA_EVENTS, KAFKA_MESSAGES } from 'nest-utils';

import { GetMembershipPlanByIdQuery } from '@membership/queries';
import { MembershipType } from '@membership/types';
import { membershipPreformAction } from '@membership/const';
import { Membership } from './entities';
import { CommissionOn } from 'prismaClient';
import { PrismaService } from 'prismaService';
import { MembershipService } from './membership.service';

@Controller()
export class MembershipController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly prisma: PrismaService,
    private readonly service: MembershipService,
  ) {}

  @EventPattern(
    KAFKA_EVENTS.BILLING_EVNETS.billingSubscriptionActivated('*', true),
  )
  async handleMembershipSubscribed(
    @Payload() { value }: { value: SubscriptionPaidEvent },
  ) {
    await this.prisma.memberShipSubscription.upsert({
      where: {
        userId: value.input.userId,
      },
      create: {
        endAt: value.input.endAt,
        startAt: value.input.startAt,
        stripeSubId: value.input.id,
        userId: value.input.userId,
        membershipId: value.input.membershipId,
        status: 'active',
      },
      update: {
        status: 'active',
      },
    });
  }

  @EventPattern(
    KAFKA_EVENTS.BILLING_EVNETS.billingSubscriptionPastdue('*', true),
  )
  async handleMembershipExpired(
    @Payload() { value }: { value: SubscriptionPaidEvent },
  ) {
    await this.prisma.memberShipSubscription.update({
      where: {
        userId: value.input.userId,
      },
      data: {
        status: 'expired',
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
          priceIds: membership.priceIds,
        },
        error: null,
      });
    } catch (error) {
      return new GetUserMembershipPriceIdMessageReply({
        success: true,
        data: null,
        error: error instanceof Error ? error : new Error(String(error)),
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
    const membership = await this.prisma.memberShipSubscription.findUnique({
      where: {
        userId: value.input.seller.id,
      },
      include: {
        membership: {
          include: {
            turnover_rules: true,
          },
        },
      },
    });

    if (!membership.membership?.turnover_rules)
      return new CanPreformProductActionMessageReply({
        success: true,
        data: false,
        error: null,
      });

    const canPreform = membership?.membership?.turnover_rules?.some(
      (v) => v.commissionOn === CommissionOn.external_click,
    );
    return new CanPreformProductActionMessageReply({
      success: true,
      data: canPreform,
      error: null,
    });
  }

  @MessagePattern(KAFKA_MESSAGES.MEMBERSHIP_MESSAGES.isExternalSeller)
  async getIsExternalSeller(
    @Payload() payload: GetIsExternalSeller,
  ): Promise<GetIsExternalSellerReply> {
    try {
      const isExternalSeller = await this.service.isPayPerClick(
        payload.input.sellerId,
      );

      return new GetIsExternalSellerReply({
        data: {
          isExternal: isExternalSeller,
        },
        error: null,
        success: true,
      });
    } catch (error) {
      return new GetIsExternalSellerReply({
        data: null,
        error: error instanceof Error ? error : new Error(String(error)),
        success: false,
      });
    }
  }
}
