import { Module } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { CqrsModule } from '@nestjs/cqrs';

import { HotelService } from './hotel.service';
import { HotelResolver } from './hotel.resolver';
import { HotelQueryHandlers } from './queries';
import { HotelRoomElasticRepository, HotelRoomRepository } from './repository';
import { HotelRoomResolver } from './hotel-room.resolver';
import { HotelSaga } from './saga/hotel.sagas';
import { HotelCommandHandlers } from './command';
import { HotelController } from './hotel.controller';

@Module({
  imports: [CqrsModule],
  providers: [
    HotelResolver,
    HotelService,
    HotelRoomResolver,
    PrismaService,
    HotelRoomRepository,
    HotelRoomElasticRepository,
    HotelSaga,
    ...HotelQueryHandlers,
    ...HotelCommandHandlers,
  ],
  controllers: [HotelController],
})
export class HotelModule {}
