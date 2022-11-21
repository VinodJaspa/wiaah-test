import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { BookServiceService } from '@book-service/book-service.service';
import { BookedService } from '@book-service/entities';
import {
  BookBeautycenterServiceInput,
  BookHealthCenterServiceInput,
  BookHotelRoomInput,
  BookRestaurantInput,
  BookVehicleServiceInput,
  DeclineAppointmentInput,
  GetBookingsHistoryInput,
  GetMyBookingsInput,
} from '@book-service/dto';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  AcceptPendingAppointmentCommand,
  DeclinePendingAppointmentCommand,
} from '@book-service/commands';

@Resolver(() => BookedService)
export class BookServiceResolver {
  constructor(
    private readonly bookServiceService: BookServiceService,
    private readonly commandbus: CommandBus,
  ) {}

  @Query(() => [BookedService])
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  getMyBookings(
    @Args('args') args: GetMyBookingsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.bookServiceService.getMyBooknigs(args, user.id);
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
      );
    }

    if (user.accountType === accountType.BUYER) {
      return this.bookServiceService.getBuyerSellerBookingHistory(
        args,
        user.id,
      );
    }
    return null;
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
  BookHotelRoom(
    @Args('bookHotelRoomInput') input: BookHotelRoomInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.bookServiceService.BookHotelRoom(input, user.id);
  }
  @Mutation(() => BookedService)
  BookRestaurant(
    @Args('bookRestarantInput') input: BookRestaurantInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.bookServiceService.BookRestaurant(input, user.id);
  }
  @Mutation(() => BookedService)
  BookHealthCenter(
    @Args('bookHealthCenterInput') input: BookHealthCenterServiceInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.bookServiceService.BookHealthCenter(input, user.id);
  }
  @Mutation(() => BookedService)
  BookBeautyCenterService(
    @Args('bookBeautyCenterInput') input: BookBeautycenterServiceInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.bookServiceService.BookBeautyCenter(input, user.id);
  }
  @Mutation(() => BookedService)
  BookVehicle(
    @Args('bookVehicle') input: BookVehicleServiceInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.bookServiceService.BookVehicleCenter(input, user.id);
  }
}
