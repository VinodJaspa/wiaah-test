import { IEvent } from '@nestjs/cqrs';
import { CreateHotelInput } from '../../dto';

export class HotelCreatedEvent implements IEvent {
  constructor(public readonly input: CreateHotelInput) {}
}
