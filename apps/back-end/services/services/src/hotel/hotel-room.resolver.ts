import { HotelRoom } from '@entities';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import {
  AuthorizationDecodedUser,
  GetLang,
  GqlCurrentUser,
  GqlSelectedQueryFields,
  UserPreferedLang,
} from 'nest-utils';
import { SearchHotelRoomLocationInput } from './dto';
import { GetHotelByIdQuery, SearchHotelRoomQuery } from './queries';
import {
  GqlHotelRoomAggregationSelectedFields,
  GqlHotelRoomSelectedFields,
} from './types/selectedFields';

@Resolver(() => HotelRoom)
export class HotelRoomResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [HotelRoom])
  searchHotelRooms(
    @Args('searchHotelRoomsArgs') args: SearchHotelRoomLocationInput,
    @GetLang() langId: string,
    @GqlSelectedQueryFields({ selectField: false })
    selectedFields: GqlHotelRoomAggregationSelectedFields,
  ): Promise<HotelRoom[]> {
    return this.queryBus.execute(
      new SearchHotelRoomQuery({
        selectedFields,
        langId,
        ...args,
      }),
    );
  }

  @ResolveReference()
  resloveRef(
    ref: { __typename: string; id: string },
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @GqlSelectedQueryFields() fields: GqlHotelRoomSelectedFields,
    @GetLang() langId: UserPreferedLang,
  ) {
    return this.queryBus.execute<GetHotelByIdQuery>(
      new GetHotelByIdQuery({
        langId,
        roomId: ref.id,
        selectedFields: fields,
        userId: user.id,
      }),
    );
  }
}
