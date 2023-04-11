import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HotelRoomElasticRepository } from '../../repository';
import { CreateElasticHotelRoomCommand } from '../impl/create-elastic-hotel-room.command';

@CommandHandler(CreateElasticHotelRoomCommand)
export class CreateElasticHotelRoomCommandHandler
  implements ICommandHandler<CreateElasticHotelRoomCommand>
{
  constructor(
    private readonly hotelRoomElasticRepository: HotelRoomElasticRepository,
  ) {}

  async execute({
    input: { location, roomId },
  }: CreateElasticHotelRoomCommand): Promise<void> {
    await this.hotelRoomElasticRepository.createRoomIndex({
      id: roomId,
      location: location,
    });
  }
}
