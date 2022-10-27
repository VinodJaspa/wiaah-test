import { ServiceLocationInput } from '@dto';

export class HotelRoomCreatedEvent {
  constructor(
    public readonly input: {
      roomId: string;
      hotelLocation: ServiceLocationInput;
    },
  ) {}
}
