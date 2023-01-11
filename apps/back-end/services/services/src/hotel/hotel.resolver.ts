import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { HotelService } from './hotel.service';
import {
  AuthorizationDecodedUser,
  GetLang,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  GqlSelectedQueryFields,
} from 'nest-utils';
import { Account, Hotel } from '@entities';
import { CreateHotelInput, GetHotelServiceArgs } from './dto';
import { UseGuards } from '@nestjs/common';
import { GqlHotelSelectedFields } from './types/selectedFields';

@Resolver(() => Hotel)
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Query(() => [Hotel])
  getHotels() {
    return this.hotelService.getHotels();
  }

  @Query(() => Hotel)
  getHotelService(
    @Args('getHotelServiceArgs') args: GetHotelServiceArgs,
    @GetLang() lang: string,
    @GqlSelectedQueryFields() fields: GqlHotelSelectedFields,
  ): Promise<Hotel> {
    return this.hotelService.getHotelWithRoomsById(args.id, lang, fields);
  }

  @Mutation(() => Hotel)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  createHotelService(
    @Args('createHotelServiceArgs') args: CreateHotelInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GetLang() lang: string,
  ) {
    return this.hotelService.createHotelService(args, user.id, lang);
  }

  @ResolveField(() => Account)
  owner(@Parent() hotel: Hotel) {
    return {
      __typename: 'Account',
      id: hotel.ownerId,
    };
  }
}
