import { HotelRoom } from '@entities';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetLang, GqlSelectedQueryFields } from 'nest-utils';
import { SearchHotelRoomLocationInput } from './dto';
import { SearchHotelRoomQuery } from './queries';
import { GqlHotelRoomAggregationSelectedFields } from './types/selectedFields';

@Resolver(() => HotelRoom)
export class HotelRoomResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [HotelRoom])
  searchHotelRooms(
    @Args('searchHotelRoomsArgs') args: SearchHotelRoomLocationInput,
    @GetLang() langId: string,
    @GqlSelectedQueryFields({ selectField: false })
    selectedFields: GqlHotelRoomAggregationSelectedFields,
  ): Promise<HotelRoom> {
    return this.queryBus.execute(
      new SearchHotelRoomQuery({
        selectedFields,
        langId,
        ...args,
      }),
    );
  }
}
