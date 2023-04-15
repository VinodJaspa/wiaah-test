import { UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { Prisma } from 'prismaClient';
import { PrismaService } from 'prismaService';
import {
  AcceptInsuranceRequestCommand,
  RefuseInsuranceRequestCommand,
  RequestInsurancePaybackCommand,
} from './commands';
import { GetInsurancesHistoryInput, GetInsurancesInput } from './dto';
import { Insurance } from './entities/insurance.entity';
import {
  GetAccountIdsByNameQuery,
  GetAccountIdsByNameQueryRes,
  GetInsurancesByStatusQuery,
  GetServiceIdsByNameQuery,
  GetServiceIdsByNameQueryRes,
} from './queries';

@Resolver(() => Insurance)
export class InsuranceResolver {
  constructor(
    private readonly querybus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Insurance])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getInsurances(
    @Args('args') args: GetInsurancesInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute(
      new GetInsurancesByStatusQuery(args.status, args.pagination),
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  requestInsurancePayBack(
    @Args('bookId', { type: () => ID }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute(
      new RequestInsurancePaybackCommand(id, user.id),
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  refuseInsurancePayBackRequest(
    @Args('bookId', { type: () => ID }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute(
      new RefuseInsuranceRequestCommand(id, user.id),
    );
  }
  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  acceptInsurancePayBackRequest(
    @Args('bookId', { type: () => ID }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.querybus.execute(
      new AcceptInsuranceRequestCommand(id, user.id),
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  async refundInsurance(
    @Args('id', { type: () => ID }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const insurance = await this.prisma.serviceInsurance.findUnique({
      where: {
        id,
      },
    });

    // TODO: send funds with stripe to buyer and update insurance status to refunded
  }

  @Query(() => [Insurance])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async getServiceInsuranceHistory(
    @Args('args') args: GetInsurancesHistoryInput,
  ) {
    const filters: Prisma.ServiceInsuranceWhereInput[] = [];

    const buyersPromise = this.querybus.execute<
      GetAccountIdsByNameQuery,
      GetAccountIdsByNameQueryRes
    >(
      new GetAccountIdsByNameQuery(
        args.buyer,
        accountType.BUYER,
        args.pagination,
      ),
    );

    const SellerPromise = this.querybus.execute<
      GetAccountIdsByNameQuery,
      GetAccountIdsByNameQueryRes
    >(
      new GetAccountIdsByNameQuery(
        args.seller,
        accountType.SELLER,
        args.pagination,
      ),
    );

    const ServicesPromise = this.querybus.execute<
      GetServiceIdsByNameQuery,
      GetServiceIdsByNameQueryRes
    >(new GetServiceIdsByNameQuery(args.service, args.pagination));

    const sellerIds = await SellerPromise;
    const buyersIds = await buyersPromise;
    const serviceIds = await ServicesPromise;

    if (sellerIds) {
      filters.push({
        sellerId: {
          in: sellerIds.map((v) => v.id),
        },
      });
    }

    if (buyersIds) {
      filters.push({
        buyerId: {
          in: buyersIds.map((v) => v.id),
        },
      });
    }

    if (args.amount) {
      filters.push({
        amount: args.amount,
      });
    }

    if (args.status) {
      filters.push({
        status: args.status,
      });
    }

    if (args.service) {
      const bookings = await this.prisma.bookedService.findMany({
        where: {
          serviceId: {
            in: serviceIds.map((v) => v.id),
          },
        },
      });

      filters.push({
        bookId: {
          in: bookings.map((v) => v.id),
        },
      });
    }

    return this.prisma.serviceInsurance.findMany({
      where: {
        AND: filters,
      },
    });
  }
}
