import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BookServiceService } from './book-service.service';
import { BookedService } from './entities/book-service.entity';
import {
  BookBeautycenterServiceInput,
  BookHealthCenterServiceInput,
  BookHotelRoomInput,
  BookRestaurantInput,
  BookVehicleServiceInput,
  GetMyBooknigsInput,
} from './dto';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { UseGuards } from '@nestjs/common';

@Resolver(() => BookedService)
export class BookServiceResolver {
  constructor(private readonly bookServiceService: BookServiceService) {}

  @Query(() => [BookedService])
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  getMyBookings(
    @Args('args') args: GetMyBooknigsInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.bookServiceService.getMyBooknigs(args, user.id);
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
