import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateHotelRoomStatusCommand } from '@hotel/command/impl';
import { HotelRoomRepository } from '@hotel/repository';
import { HotelRoom } from 'prismaClient';

@CommandHandler(UpdateHotelRoomStatusCommand)
export class UpdateHotelRoomStatusCommandhandler
  implements ICommandHandler<UpdateHotelRoomStatusCommand>
{
  constructor(private readonly repo: HotelRoomRepository) {}

  execute({ id, status }: UpdateHotelRoomStatusCommand): Promise<HotelRoom> {
    return this.repo.updateOneStatus(id, status);
  }
}
