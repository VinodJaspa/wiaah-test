import { Injectable } from '@nestjs/common';
import { GetDateBoundaries, mockedUser } from 'nest-utils';
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

  async getServiceProviderId(serviceId: string, type: string): Promise<string> {
    return mockedUser.id;
  }

  async getMyBooknigs(
    input: GetMyBooknigsInput,
    userId: string,
  ): Promise<BookedService[]> {
    const { from, to } = GetDateBoundaries(
      new Date(input.date),
      input.searchPeriod,
    );

    console.log('getting boundries', {
      type: input.searchPeriod,
      from: from.toISOString(),
      curr: input.date,
      to: to.toISOString(),
    });
    return this.prisma.bookedService.findMany({
      where: {
        AND: [
          {
            providerId: userId,
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
    const providerId = await this.getServiceProviderId(
      input.serviceId,
      'hotel',
    );
    const res = await this.prisma.bookedService.create({
      data: {
        providerId,
        ...input,
        ownerId: userId,
        type: 'hotel',
      },
    });

    return res;
  }

  async BookRestaurant(input: BookRestaurantInput, userId: string) {
    const providerId = await this.getServiceProviderId(
      input.serviceId,
      'hotel',
    );
    const res = await this.prisma.bookedService.create({
      data: {
        providerId,
        ...input,
        ownerId: userId,
        type: 'restaurant',
      },
    });

    return res;
  }

  async BookHealthCenter(input: BookHealthCenterServiceInput, userId: string) {
    const providerId = await this.getServiceProviderId(
      input.serviceId,
      'hotel',
    );
    const res = await this.prisma.bookedService.create({
      data: {
        providerId,
        ...input,
        ownerId: userId,
        type: 'health-center',
      },
    });

    return res;
  }

  async BookBeautyCenter(input: BookBeautycenterServiceInput, userId: string) {
    const providerId = await this.getServiceProviderId(
      input.serviceId,
      'hotel',
    );
    const res = await this.prisma.bookedService.create({
      data: {
        providerId,
        ...input,
        ownerId: userId,
        type: 'beauty-center',
      },
    });

    return res;
  }
  async BookVehicleCenter(input: BookBeautycenterServiceInput, userId: string) {
    const providerId = await this.getServiceProviderId(
      input.serviceId,
      'hotel',
    );
    const res = await this.prisma.bookedService.create({
      data: {
        providerId,
        ...input,
        ownerId: userId,
        type: 'vehicle-center',
      },
    });

    return res;
  }
}
