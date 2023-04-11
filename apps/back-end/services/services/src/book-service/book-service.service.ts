import { Inject, Injectable } from '@nestjs/common';
import {
  AddToDate,
  ExtractPagination,
  GetDateBoundaries,
  GqlPaginationInput,
  KAFKA_MESSAGES,
  KafkaMessageHandler,
  SERVICES,
  mockedUser,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import {
  BookServiceInput,
  GetBookingsHistoryInput,
  GetMyBookingsInput,
} from './dto';
import { BookedService } from './entities/book-service.entity';
import { QueryBus } from '@nestjs/cqrs';
import { Prisma } from 'prismaClient';
import {
  GetServiceMetaDataMessage,
  GetServiceMetaDataMessageReply,
} from 'nest-dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class BookServiceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly querybus: QueryBus,
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

  async getServiceProviderId(serviceId: string): Promise<string> {
    //TODO: Get service owner id using kafka message
    return mockedUser.id;
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
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetServiceMetaDataMessage,
      GetServiceMetaDataMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.SERVICES_MESSAGES.getServiceMetaData,
      new GetServiceMetaDataMessage({
        serviceId: input.serviceId,
        userId: userId,
      }),
    );
    if (!success) throw error;
    const { name, price, providerId, thumbnail, type } = data;

    const res = await this.prisma.bookedService.create({
      data: {
        ...input,
        type,
        ownerId: userId,
        providerId,
      },
    });

    return res;
  }
}
