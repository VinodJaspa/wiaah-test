import {
  Args,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import {
  RawService,
  Service,
  ServiceSearchResponse,
} from './entities/service.entity';
import { ServiceType } from 'prismaClient';
import { CreateServiceInput } from './dto/create-service.input';
import {
  BadRequestException,
  Inject,
  OnModuleInit,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  accountType,
  AddToDate,
  AuthorizationDecodedUser,
  CreateGqlCursorPaginatedResponse,
  GetDateOfDayInWeekOfMonth,
  getDatesInRangeDays,
  GetLang,
  getTranslatedResource,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  GqlCursorPaginationInput,
  KAFKA_MESSAGES,
  KafkaMessageHandler,
  SERVICES,
  UserPreferedLang,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { UploadService } from '@wiaah/upload';
import { ServiceWorkingSchedule } from '@working-schedule/entities';
import { Account } from '@entities';
import {
  BuyerToProductActionsType,
  CanPreformProductActionMessage,
  CanPreformProductActionMessageReply,
} from 'nest-dto';
import { ClientKafka } from '@nestjs/microservices';
import { HotelAvailablity } from './entities/service-availablity.entity';
import { Service as ServicePrisma } from 'prismaClient';
import { GraphQLUpload, Upload } from 'graphql-upload-ts';
import { BookingCost } from './entities/booking-cost.entity';
import { GetBookingCostInput } from './dto/get-booking-cost.input';
import { Weekdays } from './utils';
import { GetRecommendedServicesInput } from './dto/get-recommended-services';
import { ObjectId } from 'mongodb';
import { SearchServicesInput } from './dto/search-services.input';
import { EventBus } from '@nestjs/cqrs';
import { ServiceCreatedEvent } from './events';
import { ServiceService } from './service.service';

enum weekdaysNum {
  su = 0,
  mo = 1,
  tu = 2,
  we = 3,
  th = 4,
  fr = 5,
  sa = 6,
}

@ObjectType()
class ServicesCursorPaginationResponse extends CreateGqlCursorPaginatedResponse(
  Service,
) { }

@InputType()
export class TestUploadFile {
  @Field(() => GraphQLUpload)
  file: Upload;

  @Field(() => String)
  test: string;
}

@Resolver(() => Service)
export class ServiceResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
    @Inject(SERVICES.SERVICES_SERIVCE.token)
    private readonly eventClient: ClientKafka,

    private readonly serviceService: ServiceService,

    private readonly eventBus: EventBus,
  ) { }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([]))
  async uploadFile(
    @Args({ name: 'file', type: () => TestUploadFile })
    file: TestUploadFile,
  ): Promise<boolean> {
    console.log({ file });

    const res = await file.file.promise;

    const stream = file.file.file.createReadStream();
    return true;
  }

  @Query(() => ServicesCursorPaginationResponse)
  @UseGuards(new GqlAuthorizationGuard([]))
  async getUserServices(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('userId') userId: string,
    @Args('pagination') pagination: GqlCursorPaginationInput,
    @GetLang() userLang: UserPreferedLang,
  ): Promise<ServicesCursorPaginationResponse> {
    this.validateUserPremission(user, userId);

    // const status: ServiceStatus[] =
    //   [accountType.ADMIN, accountType.MOD].includes(
    //     user.accountType as accountType,
    //   ) || user.id === userId
    //     ? ['active', 'inActive', 'suspended']
    //     : ['active'];

    const res = await this.prisma.service.findMany({
      where: {
        sellerId: userId,
        status: 'active',
      },
      cursor: {
        id: pagination.cursor,
      },
      take: pagination.take + 1,
    });

    const count = await this.prisma.service.count({
      where: {
        sellerId: userId,
        status: 'active',
      },
    });

    return {
      cursor: pagination.cursor,
      data:
        res.length > pagination.take
          ? res
            .slice(0, res.length - 2)
            .map((v) => this.formatService(v, userLang))
          : res.map((v) => this.formatService(v, userLang)),
      hasMore: res.length > pagination.take,
      nextCursor: res.at(res.length - 1).id,
      total: count,
    };
  }

  @Mutation(() => Boolean)
  // @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  async createService(@Args('args') args: CreateServiceInput) {
    const result = await this.serviceService.createService(args);

    if (result) return true;
    return false;
  }

  @Query(() => ServiceSearchResponse)
  async searchServices(
    @Args('args', { type: () => SearchServicesInput })
    searchArgs: SearchServicesInput,
  ) {
    // TODO
  }

  @Query(() => RawService)
  @UseGuards(new GqlAuthorizationGuard([]))
  async getServiceRawData(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<RawService> {
    const service = await this.prisma.service.findUnique({
      where: {
        id,
      },
    });
    await this.validateUserPremission(user, service.sellerId);

    return service;
  }

  @Query(() => Service, { nullable: true })
  async getServiceDetails(
    @Args('id') id: string,
    @Args('isClick') isClick: Boolean,
    @GetLang() lang: UserPreferedLang,
  ): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (service.status !== 'active') return null;

    if (isClick) {
      const {
        results: { data, error, success },
      } = await KafkaMessageHandler<
        string,
        CanPreformProductActionMessage,
        CanPreformProductActionMessageReply
      >(
        this.eventClient,
        KAFKA_MESSAGES.CAN_PREFORM_ACTION_MESSAGES.canPreformProductAction(
          BuyerToProductActionsType.vendor_external_click,
        ),
        new CanPreformProductActionMessage({
          action: BuyerToProductActionsType.vendor_external_click,
          product: {
            id,
          },
          seller: {
            id: service.sellerId,
          },
        }),
      );

      if (data === true) {
        const clicks = await this.prisma.serviceDayClicks.findFirst({
          where: {
            AND: [
              {
                serviceId: id,
              },
              {
                createdAt: {
                  gte: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    0,
                    0,
                    0,
                  ),
                },
              },
            ],
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        if (clicks) {
          await this.prisma.serviceDayClicks.update({
            where: {
              id: clicks.id,
            },
            data: {
              clicks: {
                increment: 1,
              },
            },
          });
        } else {
          const clicks = await this.prisma.serviceDayClicks.create({
            data: {
              serviceId: id,
              clicks: 1,
            },
          });

          await this.prisma.service.update({
            where: {
              id,
            },
            data: {
              dayClicksId: clicks.id,
            },
          });
        }
      }
    }

    return this.formatService(service, lang);
  }

  @Query(() => [Service])
  async getUserServicesByIds(
    @Args('sellerId') sellerId: string,
    @Args('servicesIds', { type: () => [String] }) ids: string[],
  ) {
    const res = await this.prisma.service.findMany({
      where: {
        sellerId,
        id: {
          in: ids,
        },
        status: 'active',
      },
    });

    return res;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER, accountType.ADMIN]))
  async deleteService(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const service = await this.prisma.service.findUnique({
      where: {
        id,
      },
    });
    await this.validateUserPremission(user, service.sellerId);

    await this.prisma.service.delete({
      where: {
        id,
      },
    });

    return true;
  }

  @Query(() => ServicesCursorPaginationResponse)
  async getRecommendedServices(
    @Args('args', { type: () => GetRecommendedServicesInput })
    args: GetRecommendedServicesInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ServicesCursorPaginationResponse> {
    const services = await this.prisma.service.findMany({
      where: {
        status: 'active',
      },
      cursor: args.cursor ? { id: args.cursor } : undefined,
      take: args.take,
    });

    const count = await this.prisma.service.count({
      where: {
        status: 'active',
      },
    });

    return {
      cursor: args.cursor!,
      data: [],
      hasMore: false,
      nextCursor: services.at(args.take - 1)?.id,
      total: count,
    };
  }

  @Mutation(() => Boolean)
  async toggleSaveService(
    @Args('serviceId') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    try {
      const saved = await this.prisma.savedService.findUnique({
        where: {
          serviceId_userId: {
            serviceId: id,
            userId: user.id,
          },
        },
      });

      if (saved) {
        await this.prisma.savedService.delete({
          where: {
            id: saved.id,
          },
        });
      } else {
        await this.prisma.savedService.create({
          data: {
            serviceId: id,
            userId: user.id,
          },
        });
      }

      return true;
    } catch {
      return false;
    }
  }

  @Query(() => HotelAvailablity)
  async getHotelAvailablity(
    @Args('id') id: string,
    @Args('monthDate') date: string,
  ): Promise<HotelAvailablity> {
    const service = await this.prisma.service.findUnique({
      where: {
        id: id,
      },
    });

    if (
      !(
        [ServiceType.holiday_rentals, ServiceType.hotel] as ServiceType[]
      ).includes(service.type)
    )
      throw new BadRequestException('service is not a hotel nor rentals');

    const bookings = await this.prisma.bookedService.findMany({
      where: {
        AND: [
          {
            serviceId: {
              in: [id],
            },
          },
          {
            OR: [
              {
                AND: [
                  {
                    checkin: {
                      gte: new Date(date),
                    },
                  },
                  {
                    checkin: {
                      lte: AddToDate(new Date(date), { month: 1 }),
                    },
                  },
                ],
              },
              {
                AND: [
                  {
                    checkout: {
                      gte: new Date(date),
                    },
                  },
                  {
                    checkout: {
                      lte: AddToDate(new Date(date), { month: 1 }),
                    },
                  },
                ],
              },
            ],
          },
          {
            status: 'paid',
          },
        ],
      },
    });

    const offDays = await this.prisma.serviceWorkingSchedule.findUnique({
      where: {
        id: service.sellerId,
      },
    });

    const weekOfDates = Object.entries(offDays.weekdays).reduce(
      (acc, curr, i) => {
        if (!!curr[1]) {
          return acc;
        } else {
          const dayNum = weekdaysNum[curr[0]];

          const dates = GetDateOfDayInWeekOfMonth(new Date(date), dayNum);
          return [acc, dates];
        }
      },
      [],
    );

    // TODO: get dates between checkin and checkout of every booked service

    return {
      bookedDates: weekOfDates.concat(bookings),
    };
  }

  @Query(() => BookingCost, { nullable: true })
  async getBookingCost(
    @Args('args') input: GetBookingCostInput,
    @GetLang() lang: UserPreferedLang,
  ): Promise<BookingCost> {
    const {
      checkinDate,
      checkoutDate,
      extrasIds,
      servicesIds,
      checkinTime,
      adults,
      children,
    } = input;

    if (servicesIds.length < 1) return null;

    const firstService = await this.prisma.service.findUnique({
      where: {
        id: servicesIds[0],
      },
    });

    const serviceType = firstService.type;

    const multipleServices = (
      [ServiceType.beauty_center, ServiceType.restaurant] as ServiceType[]
    ).includes(serviceType);

    if (servicesIds.length > 1 && !multipleServices)
      throw new BadRequestException('you can only book 1 service a time');

    const services = multipleServices
      ? await this.prisma.service.findMany({
        where: {
          id: {
            in: servicesIds,
          },
          sellerId: firstService.sellerId,
          type: serviceType,
        },
      })
      : [firstService];

    const validServices = multipleServices
      ? services.filter((v) => v.type === serviceType)
      : [services.at(0)];

    let totalVatAmount = 0;
    let subTotal = 0;

    validServices.forEach((service, i) => {
      const dates = multipleServices
        ? [new Date(checkinDate)]
        : getDatesInRangeDays(new Date(checkinDate), new Date(checkoutDate));

      const serviceDailyPrices = service.dailyPrice ? service.dailyPrices : [];

      const qty = multipleServices
        ? servicesIds.filter((e) => e === service.id).length || 1
        : 1;

      const vat = service.vat / 100;

      dates.forEach((v) => {
        const weekDay = v.getDay();
        const weekDayPrice = serviceDailyPrices[Weekdays[weekDay]];
        const price = service.dailyPrice
          ? weekDayPrice || service.price
          : service.price;
        const totalPrice = price * qty;

        subTotal += totalPrice;
        totalVatAmount += vat * totalPrice;
      });
    });

    return {
      total: subTotal + totalVatAmount,
      services: validServices.map((v) => ({
        qty: servicesIds.filter((e) => e === v.id).length,
        service: this.formatService(v, lang),
      })),
      subTotal,
      vatAmount: totalVatAmount,
      vatPercent: (subTotal / totalVatAmount) * 100,
    };
  }

  validateUserPremission(
    user: AuthorizationDecodedUser,
    requestedUserId: string,
  ) {
    if (user.id !== requestedUserId && user.accountType === accountType.ADMIN)
      throw new UnauthorizedException('not allowed');
  }

  formatService(service: ServicePrisma, langId: string): Service {
    return {
      ...service,
      name: getTranslatedResource({ langId, resource: service.name }),
      description: getTranslatedResource({
        langId,
        resource: service.description,
      }),
      popularAmenities: getTranslatedResource({
        langId,
        resource: service.popularAmenities,
      }),
      includedServices: getTranslatedResource({
        langId,
        resource: service.includedServices,
      }),
      extras: service.extras.map((v) => ({
        ...v,
        name: getTranslatedResource({ langId, resource: v.name }),
      })),
      includedAmenities: getTranslatedResource({
        langId,
        resource: service.includedAmenities,
      }),
      ingredients: getTranslatedResource({
        langId,
        resource: service.ingredients,
      }),
    };
  }

  @ResolveReference()
  reslove(ref: { id: string }) {
    console.log('resolving ');
    return this.prisma.service.findUnique({
      where: {
        id: ref.id,
      },
    });
  }

  @ResolveField(() => ServiceWorkingSchedule, { nullable: true })
  workingHours(@Parent() service: Service) {
    return this.prisma.serviceWorkingSchedule.findUnique({
      where: {
        id: service.id,
      },
    });
  }

  @ResolveField(() => Account)
  owner(@Parent() service: Service) {
    return {
      __typename: 'Account',
      id: service.sellerId,
    };
  }

  @ResolveField(() => String, { nullable: true })
  async speciality(
    @Parent() service: Service,
    @GetLang() langId: UserPreferedLang,
  ): Promise<string> {
    const res = await this.prisma.healthCenterSpecialty.findUnique({
      where: {
        id: service.specialityId,
      },
    });

    return getTranslatedResource({ langId, resource: res.name });
  }

  @ResolveField(() => String, { nullable: true })
  async treatmentCategory(
    @Parent() service: Service,
    @GetLang() langId: UserPreferedLang,
  ) {
    const res = await this.prisma.beautyCenterTreatmentCategory.findUnique({
      where: {
        id: service.treatmentCategoryId,
      },
    });

    if (!res) return null;

    return getTranslatedResource({ langId, resource: res.title });
  }

  @ResolveField(() => [String])
  async healthCenterBookedAppointments(
    @Parent() service: Service,
  ): Promise<Date[]> {
    const now = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    );
    const booked = await this.prisma.bookedService.findMany({
      where: {
        serviceId: service.id,
        checkin: {
          gte: now,
          lte: AddToDate(now, { days: 7 }),
        },
      },
    });

    return booked.map((service) => service.checkin);
  }

  @ResolveField(() => Boolean)
  async saved(
    @Parent() service: Service,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const savedRecord = await this.prisma.savedService.findUnique({
      where: {
        serviceId_userId: {
          serviceId: service.id,
          userId: user.id,
        },
      },
    });

    return !!savedRecord;
  }

  // @ResolveField(() => RestaurantEstablishmentType)
  // establishmentType(@Parent() service: Service) {
  //   if (service.establishmentTypeId) {
  //     return this.prisma.restaurantEstablishmentType.findUnique({
  //       where: {
  //         id: service.establishmentTypeId,
  //       },
  //     });
  //   } else return null;
  // }

  // @ResolveField(() => Int, { nullable: true })
  // async dayClicks(@Parent() service: Service) {
  //   if (service.dayClicksId) return null;

  //   const clicks = await this.prisma.serviceDayClicks.findUnique({
  //     where: {
  //       id: service.dayClicksId,
  //     },
  //   });

  //   if (typeof clicks?.clicks !== 'number') return null;

  //   return clicks.clicks;
  // }
}
