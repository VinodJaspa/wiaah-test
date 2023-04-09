import { HotelRoom } from '@entities';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HotelRoomRepository } from '../../repository';
import { GetHotelByIdQuery } from '../impl';

@QueryHandler(GetHotelByIdQuery)
export class GetHotelByIdQueryHandler
  implements IQueryHandler<GetHotelByIdQuery>
{
  constructor(private readonly hotelRoomRepo: HotelRoomRepository) {}

  execute({
    args: { langId, roomId, selectedFields, userId },
  }: GetHotelByIdQuery): Promise<HotelRoom> {
    return this.hotelRoomRepo.getHotelRoomById(
      roomId,
      userId,
      selectedFields,
      langId,
    );
  }
}
