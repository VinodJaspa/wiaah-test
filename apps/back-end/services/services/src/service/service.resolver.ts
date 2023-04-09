import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { ServiceService } from './service.service';
import { Service } from './entities/service.entity';
import { ServicePresentationType, ServiceType } from 'prismaClient';
import { CreateServiceInput } from './dto/create-service.input';
import { Inject, UseGuards } from '@nestjs/common';
import {
  accountType,
  AuthorizationDecodedUser,
  GetLang,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  KafkaMessageHandler,
  SERVICES,
  UserPreferedLang,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { FileTypeEnum, UploadService } from '@wiaah/upload';
import { WorkingSchedule } from '@working-schedule/entities';
// import { RestaurantEstablishmentType } from '@restaurant';
import { Account } from '@entities';
import {
  BuyerToProductActionsType,
  CanPreformProductActionMessage,
  CanPreformProductActionMessageReply,
} from 'nest-dto';
import { ClientKafka } from '@nestjs/microservices';
import { HotelAvailablity } from './entities/service-availablity.entity';

@Resolver(() => Service)
export class ServiceResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
    @Inject(SERVICES.SERVICES_SERIVCE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  async createService(
    @Args('args') args: CreateServiceInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const {
      rooms,
      menus,
      doctors,
      treatments,
      vehicles,
      presentations,
      ...rest
    } = args;

    const servicePresenetations = await this.uploadService.uploadFiles(
      presentations.map((v) => ({
        file: {
          stream: v.file.createReadStream(),
          meta: {
            name: v.file.filename,
            mimetype: v.file.mimetype,
          },
        },
        options: {
          allowedMimtypes: [
            ...this.uploadService.mimetypes.image.all,
            ...this.uploadService.mimetypes.videos.all,
          ],
          maxSecDuration: 60 * 10 * 1000,
        },
      })),
    );

    const thumbnail = args.thumbnail.file;
    const thumb = await this.uploadService.uploadFiles([
      {
        file: {
          meta: {
            mimetype: thumbnail.mimetype,
            name: thumbnail.filename,
          },
          stream: thumbnail.createReadStream(),
        },
        options: {
          allowedMimtypes: this.uploadService.mimetypes.image.all,
          maxSizeKb: 10 * 1000, // <= 10MB
        },
      },
    ]);

    const res = await this.prisma.service.create({
      data: {
        ...rest,
        sellerId: user.id,
        thumbnail: thumb[0].src,
        presentations: servicePresenetations.map((v) => ({
          src: v.src,
          type:
            v.mimetype === FileTypeEnum.video
              ? ServicePresentationType.vid
              : ServicePresentationType.img,
        })),
      },
    });

    if (rooms) {
      await this.prisma.hotelRoom.createMany({
        data: await Promise.all(
          rooms.map(async (v) => {
            const pres = await this.uploadService.uploadFiles(
              v.presentations.map((e) => ({
                file: {
                  meta: {
                    mimetype: e.file.mimetype,
                    name: e.file.filename,
                  },
                  stream: e.file.createReadStream(),
                },
                options: {
                  allowedMimtypes: [
                    ...this.uploadService.mimetypes.image.all,
                    ...this.uploadService.mimetypes.videos.all,
                  ],
                },
              })),
            );
            return {
              ...v,
              hotelId: res.id,
              sellerId: res.sellerId,
              presentations: pres.map((v) => ({
                src: v.src,
                type:
                  this.uploadService.getFileTypeFromMimetype(v.mimetype) ===
                  FileTypeEnum.video
                    ? ServicePresentationType.vid
                    : ServicePresentationType.img,
              })),
            };
          }),
        ),
      });
    }

    if (menus) {
      await this.prisma.restaurantMenu.createMany({
        data: menus.map((v) => ({ ...v, restaurantId: res.id })),
      });
    }

    if (doctors) {
      await this.prisma.healthCenterDoctor.createMany({
        data: await Promise.all(
          doctors.map(async (v) => {
            const file = v.thumbnail.file;
            const thumbnail = await this.uploadService.uploadFiles([
              {
                file: {
                  stream: file.createReadStream(),
                  meta: {
                    mimetype: file.mimetype,
                    name: file.filename,
                  },
                },
                options: {
                  allowedMimtypes: [...this.uploadService.mimetypes.image.all],
                  maxSizeKb: 10 * 1000,
                },
              },
            ]);

            const src = thumbnail[0];

            return {
              ...v,
              healthCenterId: res.id,
              thumbnail: src.src,
            };
          }),
        ),
      });
    }

    if (treatments) {
      await this.prisma.beautyCenterTreatment.createMany({
        data: await Promise.all(
          treatments.map(async (v) => {
            const thumbnail = v.thumbnail.file;
            const thumb = await this.uploadService.uploadFiles([
              {
                file: {
                  meta: {
                    mimetype: thumbnail.mimetype,
                    name: thumbnail.filename,
                  },
                  stream: thumbnail.createReadStream(),
                },
                options: {
                  allowedMimtypes: this.uploadService.mimetypes.image.all,
                  maxSizeKb: 10 * 1000, // <= 10MB
                },
              },
            ]);

            return { ...v, thumbnail: thumb[0].src };
          }),
        ),
      });
    }

    if (vehicles) {
      await this.prisma.vehicle.createMany({
        data: await Promise.all(
          vehicles.map(async (v) => {
            const pres = await this.uploadService.uploadFiles(
              v.presentations.map((e) => ({
                file: {
                  stream: e.file.createReadStream(),
                  meta: {
                    mimetype: e.file.mimetype,
                    name: e.file.filename,
                  },
                },
                options: {
                  allowedMimtypes: [
                    ...this.uploadService.mimetypes.image.all,
                    ...this.uploadService.mimetypes.videos.all,
                  ],
                },
              })),
            );

            return {
              ...v,
              parantServiceId: res.id,
              presentations: pres.map((v) => ({
                src: v.src,
                type:
                  this.uploadService.getFileTypeFromMimetype(v.mimetype) ===
                  FileTypeEnum.video
                    ? ServicePresentationType.vid
                    : ServicePresentationType.img,
              })),
            };
          }),
        ),
      });
    }

    return true;
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

    return service as any; // TODO: format service data to user prefered lang
  }

  @ResolveReference()
  reslove(ref: { id: string }) {
    return this.prisma.service.findUnique({
      where: {
        id: ref.id,
      },
    });
  }

  @ResolveField(() => WorkingSchedule, { nullable: true })
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
      id: service.ownerId,
    };
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

  @ResolveField(() => Int, { nullable: true })
  async dayClicks(@Parent() service: Service) {
    if (service.dayClicksId) return null;

    const clicks = await this.prisma.serviceDayClicks.findUnique({
      where: {
        id: service.dayClicksId,
      },
    });

    if (typeof clicks?.clicks !== 'number') return null;

    return clicks.clicks;
  }

  @Query(() => HotelAvailablity)
  getHotelAvailablity(
    @Args('id') id: string,
    @Args('monthDate') date: string,
  ) {}
}
