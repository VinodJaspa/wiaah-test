import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import {
  Restaurant,
  GetRestaurantInput,
  UpdateRestaurantInput,
} from '@restaurant';
import { v4 as uuid } from 'uuid';
import {
  Prisma,
  RestaurantMenu,
  RestaurantService as PrismaRestaurantService,
  TranslationText,
} from 'prismaClient';
import { getTranslatedResource } from 'nest-utils';

@Injectable()
export class RestaurantService {
  constructor(private readonly prisma: PrismaService) {}

  async createRestaurant(
    input: CreateRestaurantInput,
    userId: string,
    langId: string = 'en',
  ): Promise<Restaurant> {
    const created = await this.prisma.restaurantService.create({
      data: {
        ownerId: userId,
        ...input,
        menus: input.menus.map((v) => ({
          id: uuid(),
          dishs: v.dishs.map((v) => ({
            id: uuid(),
            ...v,
          })),
          name: v.name,
        })),
      },
    });

    return this.formatRestaurant(created, langId);
  }

  async getRestaurantById(
    input: GetRestaurantInput,
    userId: string,
    langId: string,
  ): Promise<Restaurant> {
    await this.checkRestaurantViewPremissions(input.id, userId);
    const restaurant = await this.checkRestaurantViewPremissions(
      input.id,
      userId,
    );
    return this.formatRestaurant(restaurant, langId);
  }

  async updateRestaurant(
    input: UpdateRestaurantInput,
    userId: string,
    langId: string = 'en',
  ): Promise<Restaurant> {
    try {
      const { id, ...rest } = input;
      await this.checkCRUDPremissions(input.id, userId);
      const res = await this.prisma.restaurantService.update({
        where: {
          id: input.id,
        },
        data: {
          ...rest,
          menus: input.menus.map((v) => ({
            id: uuid(),
            dishs: v.dishs.map((v) => ({
              id: uuid(),
              ...v,
            })),
            name: v.name,
          })),
        },
      });

      return this.formatRestaurant(res, langId);
    } catch (error) {}
  }

  async checkRestaurantViewPremissions(
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

  async checkCRUDPremissions(
    id: string,
    userId: string,
  ): Promise<PrismaRestaurantService> {
    const res = await this.prisma.restaurantService.findUnique({
      where: {
        id,
      },
    });

    if (res.ownerId !== userId) throw new UnauthorizedException();

    return res;
  }

  formatRestaurant(input: PrismaRestaurantService, langId: string): Restaurant {
    return {
      ...input,
      serviceMetaInfo: getTranslatedResource({
        langId,
        resource: input.serviceMetaInfo,
      }),
      policies: getTranslatedResource({
        langId,
        resource: input.policies,
      }),
      menus: input.menus.map((v) => ({
        ...v,
        name: getTranslatedResource({
          langId,
          resource: v.name,
        }),
        dishs: v.dishs.map((v) => ({
          ...v,
          name: getTranslatedResource({
            langId,
            resource: v.name,
          }),
          ingredients: getTranslatedResource({
            langId,
            resource: v.ingredients,
          }),
        })),
      })),
    };
  }
}
