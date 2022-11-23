import { Injectable } from '@nestjs/common';
import {
  ExtractPagination,
  GetDateBoundaries,
  GqlPaginationInput,
  mockedUser,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import {
  BookBeautycenterServiceInput,
  BookHealthCenterServiceInput,
  BookHotelRoomInput,
  BookRestaurantInput,
  GetBookingsHistoryInput,
  GetMyBookingsInput,
} from './dto';
import { BookedService } from './entities/book-service.entity';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class BookServiceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly querybus: QueryBus,
  ) {}

  async getBuyerSellerBookingHistory(
    input: GetBookingsHistoryInput,
    buyerId: string,
  ) {
    const { skip, take } = ExtractPagination(input.pagination);

    return this.prisma.bookedService.findMany({
      where: {
        AND: [
          {
            ownerId: buyerId,
          },
          {
            status: input.status
              ? input.status
              : {
                  notIn: ['pending'],
                },
          },
        ],
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take,
      skip,
    });
  }

  async getSellerBookingHistory(
    input: GetBookingsHistoryInput,
    sellerId: string,
  ) {
    const { skip, take } = ExtractPagination(input.pagination);

    return this.prisma.bookedService.findMany({
      where: {
        AND: [
          {
            providerId: sellerId,
          },
          {
            status: input.status
              ? input.status
              : {
                  notIn: ['pending'],
                },
          },
        ],
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take,
      skip,
    });
  }

  async getServiceProviderId(serviceId: string, type: string): Promise<string> {
    return mockedUser.id;
  }

  async getMyBooknigs(
    input: GetMyBookingsInput,
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
          {
            status: {
              in: ['continuing'],
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
      'restaurant',
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
      'health-center',
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
      'beauty-center',
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
      'vehicle',
    );
    const res = await this.prisma.bookedService.create({
      data: {
        providerId,
        ...input,
        ownerId: userId,
        type: 'vehicle',
      },
    });

    return res;
  }
}
