import { HotelStatus } from '@hotel/const';

export class UpdateHotelRoomStatusCommand {
  constructor(
    public id: string,
    public status: HotelStatus,
  ) {}
}
