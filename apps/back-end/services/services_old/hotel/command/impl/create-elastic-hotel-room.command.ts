import { ServiceLocationInput } from '@dto';
import { ICommand } from '@nestjs/cqrs';

export class CreateElasticHotelRoomCommand implements ICommand {
  constructor(
    public readonly input: {
      roomId: string;
      location: ServiceLocationInput;
    },
  ) {}
}
