import { HotelService, HotelRoom } from 'prismaClient';

export class HotelRoomCreatedEvent {
  constructor(
    public args: { room: HotelRoom; hotel: HotelService; userId: string },
  ) {}
}
