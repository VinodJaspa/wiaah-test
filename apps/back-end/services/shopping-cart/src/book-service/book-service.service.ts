import { Injectable } from '@nestjs/common';
import { GetDateBoundaries } from 'nest-utils';
import { PrismaService } from 'prismaService';
import {
  BookBeautycenterServiceInput,
  BookHealthCenterServiceInput,
  BookHotelRoomInput,
  BookRestaurantInput,
  GetMyBooknigsInput,
} from './dto';
import { BookedService } from './entities/book-service.entity';

@Injectable()
export class BookServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyBooknigs(
    input: GetMyBooknigsInput,
    userId: string,
  ): Promise<BookedService[]> {
    const { from, to } = GetDateBoundaries(
      new Date(input.date),
      input.searchPeriod,
    );

    return this.prisma.bookedService.findMany({
      where: {
        AND: [
          {
            ownerId: userId,
          },
          {
            checkin: {
              gte: from,
            },
          },
          {
            checkin: {
              lte: to,
            },
          },
        ],
      },
    });
  }

  async BookHotelRoom(
    input: BookHotelRoomInput,
    userId: string,
  ): Promise<BookedService> {
    const res = await this.prisma.bookedService.create({
      data: {
        ...input,
        ownerId: userId,
        type: 'hotel',
      },
    });

    return res;
  }

  async BookRestaurant(input: BookRestaurantInput, userId: string) {
    const res = await this.prisma.bookedService.create({
      data: {
        ...input,
        ownerId: userId,
        type: 'restaurant',
      },
    });

    return res;
  }

  async BookHealthCenter(input: BookHealthCenterServiceInput, userId: string) {
    const res = await this.prisma.bookedService.create({
      data: {
        ...input,
        ownerId: userId,
        type: 'health-center',
      },
    });

    return res;
  }

  async BookBeautyCenter(input: BookBeautycenterServiceInput, userId: string) {
    const res = await this.prisma.bookedService.create({
      data: {
        ...input,
        ownerId: userId,
        type: 'beauty-center',
      },
    });

    return res;
  }
  async BookVehicleCenter(input: BookBeautycenterServiceInput, userId: string) {
    const res = await this.prisma.bookedService.create({
      data: {
        ...input,
        ownerId: userId,
        type: 'vehicle-center',
      },
    });

    return res;
  }
}
