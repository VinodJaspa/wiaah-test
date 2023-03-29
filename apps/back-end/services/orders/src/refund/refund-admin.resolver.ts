import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetFilteredRefundsInput } from '@orders/dto/get-filtered-refunds.input';
import { RefundStatusType } from '@prisma-client';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { Refund } from './entities';
import { GetUsersIdsByNameQuery, GetUsersIdsByNameQueryRes } from './queries';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class RefundAdminResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly querybus: QueryBus,
  ) {}

  @Mutation(() => Boolean)
  async adminConfirmRefund(@Args('id') id: string) {
    try {
      await this.prisma.refundRequest.update({
        where: {
          id,
        },
        data: {
          status: RefundStatusType.refunded,
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async adminCloseRefund(@Args('id') id: string) {
    try {
      await this.prisma.refundRequest.update({
        where: {
          id,
        },
        data: {
          status: RefundStatusType.closed,
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  @Query(() => Refund)
  async adminGetRefundRequest(@Args('id') id: string) {
    return this.prisma.refundRequest.findUnique({
      where: {
        id,
      },
    });
  }

  @Query(() => [Refund])
  async getRefundRequests(
    @Args('args') args: GetFilteredRefundsInput,
  ): Promise<Refund[]> {
    const { skip, take } = ExtractPagination(args.pagination);

    // TODO: apply missing filters

    let buyersPromise: Promise<GetUsersIdsByNameQueryRes>;
    let sellersPromise: Promise<GetUsersIdsByNameQueryRes>;

    if (args.buyer) {
      buyersPromise = this.querybus.execute(
        new GetUsersIdsByNameQuery(args.buyer, args.pagination),
      );
    }

    if (args.seller) {
      sellersPromise = this.querybus.execute(
        new GetUsersIdsByNameQuery(args.buyer, args.pagination),
      );
    }

    const sellersIds = (await sellersPromise).map((v) => v.id);
    const buyersIds = (await buyersPromise).map((v) => v.id);

    return this.prisma.refundRequest.findMany({
      where: {
        AND: [
          {
            sellerId: {
              in: sellersIds,
            },
          },
          {
            requestedById: {
              in: buyersIds,
            },
          },
        ],
      },
      take,
      skip,
    });
  }
}
