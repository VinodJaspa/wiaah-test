import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prismaService';
import {
  Restaurant,
  GetRestaurantInput,
  UpdateRestaurantInput,
  CreateRestaurantEstablishmentTypeInput,
  CreateRestaurantCuisinesTypeInput,
  CreateRestaurantSettingAndAmbianceInput,
  CreateRestaurantInput,
  RestaurantEstablishmentType,
  RestaurantCuisinesType,
  RestaurantSettingAndAmbiance,
  DeleteRestaurantInput,
} from '@restaurant';
import { v4 as uuid } from 'uuid';
import {
  RestaurantService as PrismaRestaurantService,
  RestaurantEstablishmentType as PrismaEstablishmentType,
  RestaurantCuisinesType as PrismaRestaurantCuisinesType,
  RestaurnatSettingAndAmbiance as PrismaRestaurantSettingAndAmbiance,
  RestaurantMenu,
  RestaurantDish,
} from 'prismaClient';
import {
  DBErrorException,
  ErrorHandlingService,
  getTranslatedResource,
  mergeObjectArray,
  TranslationService,
  UserPreferedLang,
} from 'nest-utils';
import { ServiceOwnershipService } from '@service-ownership';
import { ErrorHandlingTypedService } from '@utils';

@Injectable()
export class RestaurantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ownerShipService: ServiceOwnershipService,
    @Inject(ErrorHandlingService)
    private readonly errorHandlingService: ErrorHandlingTypedService,
  ) {}

  getRestaurants() {
    return this.prisma.restaurantService.findMany();
  }

  async createRestaurant(
    input: CreateRestaurantInput,
    userId: string,
    langId: UserPreferedLang = 'en',
  ): Promise<Restaurant> {
    await this.checkCreatePremissions(userId);
    try {
      const lowest_price = input.menus.reduce((acc, curr) => {
        const lowestDishPrice = curr.dishs.reduce((acc, curr) => {
          return curr.price < acc ? curr.price : acc;
        }, 0);
        return lowestDishPrice < acc ? lowestDishPrice : acc;
      }, 0);

      const highest_price = input.menus.reduce((acc, curr) => {
        const highestDishPrice = curr.dishs.reduce((acc, curr) => {
          return curr.price > acc ? curr.price : acc;
        }, 0);
        return highestDishPrice > acc ? highestDishPrice : acc;
      }, 0);

      const created = await this.prisma.restaurantService.create({
        data: {
          ownerId: userId,
          ...input,
          highest_price,
          lowest_price,
          menus: {
            createMany: {
              data: input.menus.map((v) => ({
                id: uuid(),
                dishs: v.dishs.map((v) => ({
                  id: uuid(),
                  ...v,
                })),
                name: v.name,
              })),
            },
          },
        },
        include: {
          menus: {
            include: {
              dishs: true,
            },
          },
        },
      });
      await this.ownerShipService.createRestaurantServiceOwnership({
        ownerId: userId,
        serviceId: created.id,
      });
      return this.formatRestaurant(created, langId);
    } catch (error) {
      console.log(error);
      throw new DBErrorException('error creating restaurant service');
    }
  }

  async getRestaurantById(
    input: GetRestaurantInput,
    langId: UserPreferedLang,
  ): Promise<Restaurant> {
    const restaurant = await this.prisma.restaurantService.findUnique({
      where: { id: input.id },
      include: {
        menus: {
          include: {
            dishs: true,
          },
        },
      },
    });
    return this.formatRestaurant(restaurant, langId);
  }

  async updateRestaurant(
    input: UpdateRestaurantInput,
    userId: string,
    langId: UserPreferedLang = 'en',
  ): Promise<Restaurant> {
    const { id, ...rest } = input;
    const service = await this.checkCRUDPremissions(input.id, userId);

    const { all } = mergeObjectArray({
      originalData: service.menus,
      updateData: rest.menus.map((v) => ({
        ...v,
        id: uuid(),
        dishs: v.dishs.map((v) => ({ ...v, id: uuid() })),
      })),
      compareKey: 'id',
    });

    const lowest_price = all
      ? all.reduce((acc, curr) => {
          const dishs = curr.dishs as RestaurantDish[];
          const lowestDishPrice = dishs.reduce((acc, curr) => {
            return curr.price < acc ? curr.price : acc;
          }, 0);
          return lowestDishPrice < acc ? lowestDishPrice : acc;
        }, 0)
      : null;

    const highest_price = all
      ? all.reduce((acc, curr) => {
          const dishs = curr.dishs as RestaurantDish[];
          const highestDishPrice = dishs.reduce((acc, curr) => {
            return curr.price > acc ? curr.price : acc;
          }, 0);
          return highestDishPrice > acc ? highestDishPrice : acc;
        }, 0)
      : null;

    try {
      const res = await this.prisma.restaurantService.update({
        where: {
          id: input.id,
        },
        data: {
          ...rest,
          highest_price: highest_price
            ? Math.max(highest_price, service.highest_price)
            : undefined,
          lowest_price: lowest_price
            ? Math.min(lowest_price, service.lowest_price)
            : undefined,
          //@ts-ignore
          menus: all,
        },
        include: {
          menus: {
            include: {
              dishs: true,
            },
          },
        },
      });

      const fn = this.formatRestaurant;

      return this.formatRestaurant(res as Parameters<typeof fn>[0], langId);
    } catch (error) {}
  }

  async deleteRestaurant(
    input: DeleteRestaurantInput,
    userId: string,
    langId: UserPreferedLang,
  ): Promise<Restaurant> {
    await this.checkCRUDPremissions(input.id, userId);
    try {
      const res = await this.prisma.restaurantService.delete({
        where: {
          id: input.id,
        },
        include: {
          menus: {
            include: {
              dishs: true,
            },
          },
        },
      });
      await this.ownerShipService.deleteServiceOwnerShipByServiceId(res.id);
      return this.formatRestaurant(res, langId);
    } catch (error) {
      console.log(error);
    }
  }

  async activateRestaurant(id: string, userId: string) {
    await this.checkCRUDPremissions(id, userId);
    const res = await this.prisma.restaurantService.update({
      where: {
        id,
      },
      data: {
        status: 'active',
      },
    });
    return res;
  }

  async createRestaurantEstablishmentType(
    input: CreateRestaurantEstablishmentTypeInput,
    userId: string,
    langId: UserPreferedLang = 'en',
  ): Promise<RestaurantEstablishmentType> {
    const res = await this.prisma.restaurantEstablishmentType.create({
      data: {
        ...input,
        createdById: userId,
      },
    });
    return this.formatRestaurantEstablishmentType(res, langId);
  }

  async deleteRestaurantEstablishmentType(
    typeId: string,
    langId: UserPreferedLang,
  ): Promise<RestaurantEstablishmentType> {
    const res = await this.prisma.restaurantEstablishmentType.delete({
      where: {
        id: typeId,
      },
    });
    return this.formatRestaurantEstablishmentType(res, langId);
  }

  async getRestaurantEstablishmentTypes(
    langId: UserPreferedLang,
  ): Promise<RestaurantEstablishmentType[]> {
    const res = await this.prisma.restaurantEstablishmentType.findMany({
      where: {
        status: 'active',
      },
    });

    return res.map((v) => this.formatRestaurantEstablishmentType(v, langId));
  }

  async ActivateRestaurantEstablishmentType(
    typeId: string,
    userId: string,
  ): Promise<RestaurantEstablishmentType> {
    const res = await this.prisma.restaurantEstablishmentType.update({
      where: {
        id: typeId,
      },
      data: {
        status: 'active',
      },
    });
    return this.formatRestaurantEstablishmentType(res, 'en');
  }

  async createRestaurantCuisinesType(
    input: CreateRestaurantCuisinesTypeInput,
    userId: string,
    langId: UserPreferedLang,
  ): Promise<RestaurantCuisinesType> {
    const res = await this.prisma.restaurantCuisinesType.create({
      data: {
        ...input,
        createdById: userId,
      },
    });
    return this.formatRestaurantCusisineType(res, langId);
  }

  async deleteRestaurantCuisineType(typeId: string, langId: UserPreferedLang) {
    const res = await this.prisma.restaurantCuisinesType.delete({
      where: {
        id: typeId,
      },
    });
    return this.formatRestaurantCusisineType(res, langId);
  }

  async getRestaurantCuisineTypes(
    langId: UserPreferedLang,
  ): Promise<RestaurantCuisinesType[]> {
    const res = await this.prisma.restaurantCuisinesType.findMany({
      where: {
        status: 'active',
      },
    });
    return res.map((v) => this.formatRestaurantCusisineType(v, langId));
  }

  async ActivateRestaurantCuisineType(
    typeId: string,
    userId: string,
    langId: string,
  ): Promise<RestaurantCuisinesType> {
    const res = await this.prisma.restaurantCuisinesType.update({
      where: {
        id: typeId,
      },
      data: {
        status: 'active',
      },
    });

    return this.formatRestaurantCusisineType(res, langId);
  }

  async createRestaurantSettingAndAmbiance(
    input: CreateRestaurantSettingAndAmbianceInput,
    userId: string,
    langId: UserPreferedLang,
  ): Promise<RestaurantSettingAndAmbiance> {
    const res = await this.prisma.restaurnatSettingAndAmbiance.create({
      data: {
        ...input,
        createdById: userId,
      },
    });

    return this.formatRestaurantSettingAndAmbiance(res, langId);
  }

  async deleteRestaurantSettingAndAmbiance(typeId: string, langId: string) {
    const res = await this.prisma.restaurnatSettingAndAmbiance.delete({
      where: {
        id: typeId,
      },
    });
    return this.formatRestaurantSettingAndAmbiance(res, langId);
  }

  async activateRestaurantSettingAndAmbiance(
    id: string,
    langId: UserPreferedLang,
  ) {
    const res = await this.prisma.restaurnatSettingAndAmbiance.update({
      where: {
        id,
      },
      data: {
        status: 'active',
      },
    });
    return this.formatRestaurantSettingAndAmbiance(res, langId);
  }

  private async checkRestaurantViewPremissions(
    id: string,
    userId: string | null,
  ): Promise<PrismaRestaurantService> {
    const res = await this.prisma.restaurantService.findUnique({
      where: {
        id,
      },
    });

    if (res.status !== 'active')
      throw new ForbiddenException('this service is not active');

    return res;
  }

  private async checkCreatePremissions(userId: string): Promise<boolean> {
    const hasService =
      !!(await this.ownerShipService.getServiceOwnershipByUserId(userId));
    if (hasService) throw new ForbiddenException();
    return true;
  }

  private async checkCRUDPremissions(id: string, userId: string) {
    const res = await this.prisma.restaurantService.findUnique({
      where: {
        id,
      },
      include: {
        menus: {
          include: {
            dishs: true,
          },
        },
      },
    });

    if (res.ownerId !== userId) throw new UnauthorizedException();

    return res;
  }

  private formatRestaurantSettingAndAmbiance(
    input: PrismaRestaurantSettingAndAmbiance,
    langId: UserPreferedLang,
  ): RestaurantSettingAndAmbiance {
    return {
      ...input,
      name: getTranslatedResource({
        langId,
        resource: input.name,
      }),
    };
  }

  private formatRestaurantCusisineType(
    input: PrismaRestaurantCuisinesType,
    langId: UserPreferedLang,
  ): RestaurantCuisinesType {
    return {
      ...input,
      name: getTranslatedResource({
        langId,
        resource: input.name,
      }),
    };
  }

  private formatRestaurantEstablishmentType(
    input: PrismaEstablishmentType,
    langId: UserPreferedLang,
  ): RestaurantEstablishmentType {
    return {
      ...input,
      name: getTranslatedResource({
        langId,
        resource: input.name,
      }),
    };
  }

  private formatRestaurant(
    input: PrismaRestaurantService & {
      menus: (RestaurantMenu & { dishs: RestaurantDish[] })[];
    },
    langId: UserPreferedLang,
  ): Restaurant {
    return {
      ...input,
      serviceMetaInfo: getTranslatedResource({
        langId: langId,
        resource: input.serviceMetaInfo,
      }),
      policies: getTranslatedResource({
        langId: langId,
        resource: input.policies,
      }),
      menus: input.menus.map((v) => ({
        ...v,
        name: getTranslatedResource({
          langId: langId,
          resource: v.name,
        }),
        dishs: v.dishs.map((v) => ({
          ...v,
          name: getTranslatedResource({
            langId: langId,
            resource: v.name,
          }),
          ingredients: getTranslatedResource({
            langId: langId,
            resource: v.ingredients,
          }),
        })),
      })),
    };
  }
}
