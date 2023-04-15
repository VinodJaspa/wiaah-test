import { Inject, Injectable } from '@nestjs/common';
import { AddToDate, ExtractPagination, SERVICES, mockedUser } from 'nest-utils';
import { PrismaService } from 'prismaService';
import {
  BookServiceInput,
  GetBookingsHistoryInput,
  GetMyBookingsInput,
} from './dto';
import { BookedService } from './entities/book-service.entity';
import { QueryBus } from '@nestjs/cqrs';
import { Prisma, Service } from 'prismaClient';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class BookServiceService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.SHOPPING_CART_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  async getBuyerSellerBookingHistory(
    input: GetBookingsHistoryInput,
    buyerId: string,
    q: string,
  ) {
    const { skip, take } = ExtractPagination(input.pagination);
    const queryFilters: Prisma.BookedServiceWhereInput[] = [];

    if (q) {
      queryFilters.push({
        id: { contains: q },
      });
      queryFilters.push({
        ownerId: { contains: q },
      });
      queryFilters.push({
        providerId: { contains: q },
      });
    }

    return this.prisma.bookedService.findMany({
      where: {
        AND: [
          {
            ownerId: buyerId,
          },
          {
            status: input.status,
          },
          {
            purchased: true,
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
            status: input.status,
          },
          {
            purchased: true,
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

  async getServiceProviderId(serviceId: string): Promise<string> {
    const seller = await this.prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    return seller.sellerId;
  }

  async getMyBooknigs(
    input: GetMyBookingsInput,
    userId: string,
  ): Promise<BookedService[]> {
    const from = new Date(input.date);
    const to = AddToDate(from, { days: input.days });

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
              in: ['completed', 'continuing'],
            },
          },
        ],
      },
    });
  }

  async BookService(
    input: BookServiceInput,
    userId: string,
  ): Promise<BookedService> {
    const service = await this.CanBookService(input.serviceId, userId);

    const res = await this.prisma.bookedService.create({
      data: {
        ...input,
        type: service.type,
        ownerId: userId,
        providerId: service.sellerId,
      },
    });

    return res;
  }

  async CanBookService(serviceId: string, userId: string): Promise<Service> {
    const res = await this.prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    return res;
  }
}
