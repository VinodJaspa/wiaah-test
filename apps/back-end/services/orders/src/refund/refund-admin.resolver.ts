import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetFilteredRefundsInput } from '@orders/dto/get-filtered-refunds.input';
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
  @Query(() => [Refund])
  async getRefundRequests(
    @Args('args') args: GetFilteredRefundsInput,
  ): Promise<Refund[]> {
    const { skip, take } = ExtractPagination(args.pagination);

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
