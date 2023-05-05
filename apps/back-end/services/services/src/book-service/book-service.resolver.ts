import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BookServiceService } from '@book-service/book-service.service';
import {
  BookedService,
  Cashback,
  Discount,
  MyBookings,
} from '@book-service/entities';
import {
  AdminGetBookingsInput,
  BookServiceInput,
  DeclineAppointmentInput,
  GetBookingsHistoryAdminInput,
  GetBookingsHistoryInput,
  GetMyBookingsInput,
} from '@book-service/dto';
import {
  AccountType,
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import {
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  AcceptPendingAppointmentCommand,
  CancelServiceReservationCommand,
  DeclinePendingAppointmentCommand,
} from '@book-service/commands';
import { PrismaService } from 'prismaService';
import { Prisma, ServiceType } from 'prismaClient';
import { Account, HotelRoom } from '@entities';
import { Service } from '@service/entities/service.entity';
import { Dish } from '@restaurant';
import { Insurance } from '@insurance/entities';

@Resolver(() => BookedService)
export class BookServiceResolver {
  constructor(
    private readonly bookServiceService: BookServiceService,
    private readonly commandbus: CommandBus,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [BookedService])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetUserBookings(
    @Args('args') args: GetMyBookingsInput,
    @Args('accountId') id: string,
  ) {
    return this.bookServiceService.getMyBooknigs(args, id);
  }

  @Query(() => MyBookings)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  async getMyBookings(
    @Args('args') args: GetMyBookingsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<MyBookings> {
    const res = await this.bookServiceService.getMyBooknigs(args, user.id);

    return {
      data: res,
      take: args.days,
      cursor: args.date,
    };
  }

  @Query(() => BookedService)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  async getBookedServiceDetails(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const res = await this.prisma.bookedService.findUnique({
      where: {
        id,
      },
    });

    if (!res) throw new NotFoundException();

    if (res.ownerId !== user.id && res.providerId !== user.id)
      throw new UnauthorizedException();

    return res;
  }

  @Query(() => [BookedService])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getUserBookingHistory(
    @Args('args', { type: () => GetBookingsHistoryAdminInput })
    args: GetBookingsHistoryAdminInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    if (args.accountType === accountType.SELLER) {
      return this.bookServiceService.getBuyerSellerBookingHistory(
        args,
        args.userId,
        args.q,
      );
    }

    if (args.accountType === accountType.BUYER) {
      return this.bookServiceService.getBuyerSellerBookingHistory(
        args,
        args.userId,
        args.q,
      );
    }
    return null;
  }

  @Query(() => [BookedService])
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER, accountType.BUYER]))
  adminGetAccountBookingHistory(
    @Args('args', { type: () => GetBookingsHistoryInput })
    args: GetBookingsHistoryInput,
    @Args('accountId') id: string,
    @Args('accountType') type: AccountType,
  ) {
    if (type === accountType.SELLER) {
      return this.bookServiceService.getBuyerSellerBookingHistory(
        args,
        id,
        args.q,
      );
    }

    if (type === accountType.BUYER) {
      return this.bookServiceService.getBuyerSellerBookingHistory(
        args,
        id,
        args.q,
      );
    }
    return null;
  }

  @Query(() => [BookedService])
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER, accountType.BUYER]))
  getBookingHistory(
    @Args('args', { type: () => GetBookingsHistoryInput })
    args: GetBookingsHistoryInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    if (user.accountType === accountType.SELLER) {
      return this.bookServiceService.getBuyerSellerBookingHistory(
        args,
        user.id,
        args.q,
      );
    }

    if (user.accountType === accountType.BUYER) {
      return this.bookServiceService.getBuyerSellerBookingHistory(
        args,
        user.id,
        args.q,
      );
    }
    return null;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER, accountType.BUYER]))
  async cancelServiceReservation(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.commandbus.execute(
      new CancelServiceReservationCommand(id, user.id),
    );

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  async acceptAppointment(
    @Args('id', { type: () => ID }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.commandbus.execute<AcceptPendingAppointmentCommand>(
      new AcceptPendingAppointmentCommand(id, user.id),
    );
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  async declineAppointment(
    @Args('args', { type: () => DeclineAppointmentInput })
    args: DeclineAppointmentInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    await this.commandbus.execute<DeclinePendingAppointmentCommand>(
      new DeclinePendingAppointmentCommand(args, user.id),
    );
    return true;
  }

  @Mutation(() => BookedService)
  BookService(
    @Args('args') input: BookServiceInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.bookServiceService.BookService(input, user.id);
  }

  @Query(() => [BookedService])
  adminGetBookings(@Args('args') args: AdminGetBookingsInput) {
    let filters: Prisma.BookedServiceWhereInput[] = [];

    if (args.id) {
      filters.push({
        id: {
          contains: args.id,
        },
      });
    }

    if (args.status) {
      filters.push({
        status: args.status,
      });
    }

    if (args.total) {
      filters.push({
        id: {
          contains: args.id,
        },
      });
    }
    if (args.id) {
      filters.push({
        id: {
          contains: args.id,
        },
      });
    }
    if (args.id) {
      filters.push({
        id: {
          contains: args.id,
        },
      });
    }
    if (args.id) {
      filters.push({
        id: {
          contains: args.id,
        },
      });
    }
    if (args.id) {
      filters.push({
        id: {
          contains: args.id,
        },
      });
    }

    return this.prisma.bookedService.findMany({
      where: {
        AND: filters,
      },
    });
  }

  @ResolveField(() => Account)
  buyer(@Parent() service: BookedService) {
    return {
      __typename: 'Account',
      id: service.ownerId,
    };
  }

  @ResolveField(() => Account)
  seller(@Parent() service: BookedService) {
    return {
      __typename: 'Account',
      id: service.providerId,
    };
  }

  @ResolveField(() => Service)
  service(@Parent() bookedService: BookedService) {
    return this.prisma.service.findUnique({
      where: {
        id: bookedService.serviceId,
      },
    });
  }

  @ResolveField(() => [Service])
  treatments(@Parent() service: BookedService) {
    return this.prisma.service.findMany({
      where: {
        id: {
          in: service.treatmentsIds,
        },
      },
    });
  }

  @ResolveField(() => [Service])
  dishs(@Parent() service: BookedService) {
    return this.prisma.service.findMany({
      where: {
        id: {
          in: service.dishsIds,
        },
      },
    });
  }

  @ResolveField(() => Service)
  doctor(@Parent() service: BookedService) {
    return service.treatmentsIds.map((id) => ({
      __typename: 'Doctor',
      id,
    }));
  }

  @ResolveField(() => Discount)
  cashback(@Parent() service: BookedService) {
    return {
      __typename: 'Cashback',
      id: service.cashbackId,
    };
  }

  @ResolveField(() => Cashback)
  discount(@Parent() service: BookedService) {
    return {
      __typename: 'Discount',
      id: service.discountId,
    };
  }

  @ResolveField(() => HotelRoom, { nullable: true })
  room(@Parent() service: Service) {
    if (service.type === ServiceType.hotel) {
      return this.prisma.service.findUnique({
        where: {
          id: service.id,
        },
      });
    } else return null;
  }

  @ResolveField(() => Dish, { nullable: true })
  dish(@Parent() service: Service) {
    if (service.type === ServiceType.restaurant) {
      return this.prisma.service.findUnique({
        where: {
          id: service.id,
        },
      });
    } else return null;
  }

  @ResolveField(() => Insurance, { nullable: true })
  insurance(@Parent() book: BookedService) {
    return this.prisma.serviceInsurance.findUnique({
      where: {
        bookId: book.id,
      },
    });
  }
}
