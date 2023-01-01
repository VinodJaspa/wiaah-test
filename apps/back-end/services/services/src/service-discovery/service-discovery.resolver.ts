import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetLang, UserPreferedLang } from 'nest-utils';
import { Prisma, ServiceType } from 'prismaClient';
import { PrismaService } from 'prismaService';
import {
  GetFilteredServicesAdminInput,
  updateBeautyCenterAdminInput,
  updateHealthCenterAdminInput,
  updateHotelAdminInput,
  updateRestaurantAdminInput,
  updateVehicleAdminInput,
} from './dto';
import { ServiceDiscovery } from './entities/service-discovery.entity';

@Resolver(() => ServiceDiscovery)
export class ServiceDiscoveryResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [ServiceDiscovery])
  async getFilteredServices(
    @Args('args') args: GetFilteredServicesAdminInput,
    @GetLang() lang: UserPreferedLang,
  ): Promise<ServiceDiscovery[]> {
    switch (args.type) {
      case ServiceType.hotel:
        const hotel = await this.getHotels(args);
        return hotel.map((v) => ({
          id: v.id,
          price: [v.lowest_price, v.highest_price],
          sellerId: v.ownerId,
          sellerName: '',
          status: 'active',
          thumbnail: v.presentations.find((p) => p.type === 'img').src || '',
          title:
            v.serviceMetaInfo.find((s) => s.langId === lang)?.value?.title ||
            v.serviceMetaInfo[0]?.value?.title,
          type: args.type,
          updatedAt: v.updatedAt.toString(),
        }));
      case ServiceType.restaurant:
        const res = await this.getRestaurant(args);
        return res.map((v) => ({
          id: v.id,
          price: [v.lowest_price, v.highest_price],
          sellerId: v.ownerId,
          sellerName: '',
          status: 'active',
          thumbnail: v.presentations.find((t) => t.type === 'img')?.src || '',
          title:
            v.serviceMetaInfo.find((s) => s.langId === lang)?.value?.title ||
            v.serviceMetaInfo[0]?.value?.title,
          type: args.type,
          updatedAt: v.updatedAt.toString(),
        }));
      case ServiceType.health_center:
        const health = await this.getHealthCenter(args);
        return health.map((v) => ({
          id: v.id,
          price: [v.lowest_price, v.highest_price],
          sellerId: v.ownerId,
          status: 'active',
          sellerName: '',
          thumbnail: v.presentations[0].src,
          title:
            v.serviceMetaInfo.find((s) => s.langId === lang)?.value?.title ||
            v.serviceMetaInfo[0]?.value?.title,
          type: args.type,
          updatedAt: v.updatedAt.toString(),
        }));
      case ServiceType.beauty_center:
        const center = await this.getBeautyCenter(args);
        return center.map((v) => ({
          id: v.id,
          price: [v.lowest_price, v.heigest_price],
          sellerId: v.ownerId,
          sellerName: '',
          status: v.status,
          thumbnail: v.presentations[0].src,
          title: v.serviceMetaInfo[0]?.value?.title,
          type: args.type,
          updatedAt: new Date(v.updatedAt).toString(),
        }));
      case ServiceType.vehicle:
        const vehicle = await this.getVehicle(args);
        return vehicle.map((v) => ({
          id: v.id,
          price: [v.vehicles[0].price, v.vehicles[0].price],
          sellerId: v.ownerId,
          sellerName: '',
          status: 'active',
          thumbnail: v.presentations.find((t) => t.type === 'img').src,
          title:
            v.serviceMetaInfo.find((l) => l.langId === lang)?.value?.title ||
            v.serviceMetaInfo[0]?.value?.title,
          updatedAt: '',
          type: args.type,
        }));
      default:
        break;
    }
  }

  async getHotels(args: GetFilteredServicesAdminInput) {
    const filters: Prisma.HotelServiceWhereInput[] = [];

    if (args.id) {
      filters.push({
        id: {
          contains: args.id,
        },
      });
    }
    if (args.price) {
      filters.push({
        lowest_price: {
          gte: args.price,
        },
      });

      filters.push({
        highest_price: {
          lte: args.price,
        },
      });
    }
    if (args.status) {
      filters.push({
        status: args.status,
      });
    }
    if (args.title) {
      filters.push({
        serviceMetaInfo: {
          some: {
            value: {
              is: {
                title: {
                  contains: args.title,
                },
              },
            },
          },
        },
      });
    }

    return this.prisma.hotelService.findMany({
      where: {
        AND: filters,
      },
    });
  }

  async getRestaurant(args: GetFilteredServicesAdminInput) {
    const filters: Prisma.RestaurantServiceWhereInput[] = [];

    if (args.id) {
      filters.push({
        id: {
          contains: args.id,
        },
      });
    }
    if (args.price) {
      filters.push({
        lowest_price: {
          gte: args.price,
        },
      });

      filters.push({
        highest_price: {
          lte: args.price,
        },
      });
    }
    if (args.status) {
      filters.push({
        status: args.status,
      });
    }
    if (args.title) {
      filters.push({
        serviceMetaInfo: {
          some: {
            value: {
              is: {
                title: {
                  contains: args.title,
                },
              },
            },
          },
        },
      });
    }

    return this.prisma.restaurantService.findMany({
      where: {
        AND: filters,
      },
    });
  }

  async getHealthCenter(args: GetFilteredServicesAdminInput) {
    const filters: Prisma.HealthCenterServiceWhereInput[] = [];

    if (args.id) {
      filters.push({
        id: {
          contains: args.id,
        },
      });
    }
    if (args.price) {
      filters.push({
        doctors: {
          some: {
            price: {
              gte: args.price,
            },
          },
        },
      });
    }
    if (args.status) {
      filters.push({
        status: args.status,
      });
    }
    if (args.title) {
      filters.push({
        serviceMetaInfo: {
          some: {
            value: {
              is: {
                title: {
                  contains: args.title,
                },
              },
            },
          },
        },
      });
    }

    return this.prisma.healthCenterService.findMany({
      where: {
        AND: filters,
      },
    });
  }

  async getBeautyCenter(args: GetFilteredServicesAdminInput) {
    const filters: Prisma.BeautyCenterServiceWhereInput[] = [];

    if (args.id) {
      filters.push({
        id: {
          contains: args.id,
        },
      });
    }
    if (args.price) {
      filters.push({
        lowest_price: {
          gte: args.price,
        },
      });

      filters.push({
        heigest_price: {
          lte: args.price,
        },
      });
    }
    if (args.status) {
      filters.push({
        status: args.status,
      });
    }
    if (args.title) {
      filters.push({
        serviceMetaInfo: {
          some: {
            value: {
              is: {
                title: {
                  contains: args.title,
                },
              },
            },
          },
        },
      });
    }

    return this.prisma.beautyCenterService.findMany({
      where: {
        AND: filters,
      },
    });
  }

  async getVehicle(args: GetFilteredServicesAdminInput) {
    const filters: Prisma.VehicleServiceWhereInput[] = [];

    if (args.id) {
      filters.push({
        id: {
          contains: args.id,
        },
      });
    }
    if (args.price) {
      filters.push({
        vehicles: {
          some: {
            price: {
              gte: args.price,
            },
          },
        },
      });
    }
    // if (args.status) {
    //   filters.push({
    //     status: args.status,
    //   });
    // }
    if (args.title) {
      filters.push({
        serviceMetaInfo: {
          some: {
            value: {
              is: {
                title: {
                  contains: args.title,
                },
              },
            },
          },
        },
      });
    }

    return this.prisma.vehicleService.findMany({
      where: {
        AND: filters,
      },
      include: {
        vehicles: true,
      },
    });
  }

  @Mutation(() => Boolean)
  async updateHotelAdmin(args: updateHotelAdminInput) {
    const { id, ...rest } = args;

    await this.prisma.hotelService.update({
      where: {
        id,
      },
      data: {
        ...rest,
        rooms: {
          updateMany: rest.rooms.map((v) => ({
            where: {
              id: v.id,
            },
            data: {
              ...v,
            },
          })),
        },
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  async updateRestaurantAdmin(args: updateRestaurantAdminInput) {
    const { id, ...rest } = args;

    await this.prisma.restaurantService.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  async updateHealthCentertAdmin(args: updateHealthCenterAdminInput) {
    const { id, ...rest } = args;

    await this.prisma.healthCenterService.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  async updateBeautyCenterAdmin(args: updateBeautyCenterAdminInput) {
    const { id, ...rest } = args;

    await this.prisma.beautyCenterService.update({
      where: {
        id,
      },
      data: {
        ...rest,
        treatments: rest.treatments.map((v) => ({
          ...v,
          price: v.price,
          treatmentCategoryId: v.treatmentCategoryId,
          discount: v.discount,
        })),
      },
    });

    return true;
  }

  @Mutation(() => Boolean)
  async updateVehicleAdmin(args: updateVehicleAdminInput) {
    const { id, ...rest } = args;

    await this.prisma.vehicleService.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });

    return true;
  }
}
