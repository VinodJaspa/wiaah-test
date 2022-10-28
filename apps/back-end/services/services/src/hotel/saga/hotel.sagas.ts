import { Injectable } from '@nestjs/common';
import { Saga, ofType, CommandBus } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { CreateElasticHotelRoomCommand } from '../command/impl/create-elastic-hotel-room.command';
import { HotelCreatedEvent } from '../events';
import { HotelRoomCreatedEvent } from '../events';

@Injectable()
export class HotelSaga {
  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  hotelCreated = (events$: Observable<any>): Observable<void> => {
    return events$.pipe(
      ofType(HotelCreatedEvent),
      map((event) => {}),
    );
  };

  @Saga()
  hotelRoomCreated = (events$: Observable<any>): Observable<void> => {
    return events$.pipe(
      ofType(HotelRoomCreatedEvent),
      map(({ args: { hotel, room, userId } }) => {
        console.log({ hotel: hotel.id, room: room.id, userId });
        this.commandBus.execute<CreateElasticHotelRoomCommand, void>(
          new CreateElasticHotelRoomCommand({
            location: hotel.location,
            roomId: room.id,
          }),
        );
      }),
    );
  };
}
