import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HotelService } from './hotel.service';
import {
  AuthorizationDecodedUser,
  GetLang,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { HotelServiceEntity } from '@entities';
import { CreateHotelInput, GetHotelServiceArgs } from './dto';
import { UseGuards } from '@nestjs/common';

@Resolver(() => HotelServiceEntity)
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Query(() => HotelServiceEntity)
  getHotelService(
    @Args('getHotelServiceArgs') args: GetHotelServiceArgs,
    @GetLang() lang: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<HotelServiceEntity> {
    return this.hotelService.getHotelWithRoomsById(args.id, user.id, lang);
  }

  @Mutation(() => HotelServiceEntity)
  @UseGuards(new GqlAuthorizationGuard(['seller']))
  createHotelService(
    @GetLang() lang: string,
    @Args('createHotelServiceArgs') args: CreateHotelInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.hotelService.createHotelService(args, user.id, lang);
  }
}
