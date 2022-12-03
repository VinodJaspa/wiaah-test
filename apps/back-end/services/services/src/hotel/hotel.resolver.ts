import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HotelService } from './hotel.service';
import {
  AuthorizationDecodedUser,
  GetLang,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  GqlSelectedQueryFields,
} from 'nest-utils';
import { Hotel } from '@entities';
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
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GqlSelectedQueryFields() fields: GqlHotelSelectedFields,
  ): Promise<Hotel> {
    return this.hotelService.getHotelWithRoomsById(
      args.id,
      user.id,
      lang,
      fields,
    );
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
}
