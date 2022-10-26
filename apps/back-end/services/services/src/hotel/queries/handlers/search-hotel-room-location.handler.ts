import { HotelRoom, HotelServiceEntity } from '@entities';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HotelRoomRepository } from '../../repository';
import { SearchHotelRoomQuery } from '../impl';

@QueryHandler(SearchHotelRoomQuery)
export class SearchHotelRoomLocationHandler
  implements IQueryHandler<SearchHotelRoomQuery>
{
  constructor(private readonly hotelRoomRepository: HotelRoomRepository) {}

  async execute({
    args: { selectedFields, langId, ...rest },
  }: SearchHotelRoomQuery): Promise<HotelRoom[]> {
    const res =
      await this.hotelRoomRepository.getFilteredRoomsWithLocationSearch(
        rest,
        selectedFields,
        langId,
      );

    console.log('query', { res });
    return res;
  }
}
