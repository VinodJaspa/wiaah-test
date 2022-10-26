import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelResolver } from './hotel.resolver';
import { PrismaService } from 'prismaService';
import { CqrsModule } from '@nestjs/cqrs';
import { HotelQueryHandlers } from './queries';
import { HotelRoomRepository } from './repository';
import { HotelRoomResolver } from './hotel-room.resolver';

@Module({
  imports: [CqrsModule],
  providers: [
    HotelResolver,
    HotelService,
    HotelRoomResolver,
    PrismaService,
    HotelRoomRepository,

    ...HotelQueryHandlers,
  ],
})
export class HotelModule {}
