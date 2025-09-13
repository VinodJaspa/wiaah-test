import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  createRadiusCoordsByKm,
  ExtractPagination,
  getTranslatedResource,
  UserPreferedLang,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { EventBus } from '@nestjs/cqrs';

import { Shop as ShopEntity } from './entities';
import { CreateShopInput } from './dto/create-shop.input';
import { FilteredShopsInput } from './dto/filter-shops.input';
import { GetNearShopsInput } from './dto/get-near-shops.dto';
import { ShopCreatedEvent, ShopCreationFailedEvent } from './events';
import { UpdateUserShopInput } from './dto';
import { MemberType, Shop } from '@prisma-client';

@Injectable()
export class ShopService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) { }

//   async CreateShop(
//     createShopInput: CreateShopInput,
//     user: AuthorizationDecodedUser,
//   ): Promise<ShopEntity> {
//     const userHasShop = await this.hasShop(user.id);
//     console.log(createShopInput, "createShopInput");

//     if (userHasShop)
//       throw new UnprocessableEntityException(
//         'this account already has an shop, seller account can only have 1 shop',
//       );

//     try {
//       const createdShop = await this.prisma.shop.create({
//         data: {
//           ...createShopInput,
//           ownerId: user.id,
//           verified: false,
//           geoLocation: {
//             coordinates: [
//               createShopInput.location.long,
//               createShopInput.location.lat,
//             ],
//           },
//           name: { set: createShopInput.name.map((text) => ({ ...text, value: String(text.value) })) },
//           description: { set: createShopInput.description.map((text) => ({ ...text, value: String(text.value) })) },
//         },
//         // 👇 only if corporation/company
//         members:
//           createShopInput.type === "COMPANY"
//             ? {
//               create: createShopInput.members.map((member) => ({
//                 userId: member.userId,
//                 memberType: member.memberType,
//                 role: member.role,
//               })),
//             }
//             : undefined,
//       },
//       });
//     this.eventBus.publish<ShopCreatedEvent>(
//       new ShopCreatedEvent(user.id, createdShop),
//     );
//     return this.formatShopData(createdShop);
//   } catch(error: any) {
//     this.eventBus.publish<ShopCreationFailedEvent>(
//       new ShopCreationFailedEvent(error),
//     );
//     throw new Error(error);
//   }
// }
async CreateShop(
  createShopInput: CreateShopInput,
  user: AuthorizationDecodedUser,
): Promise<ShopEntity> {
  const userHasShop = await this.hasShop(user.id);
  if (userHasShop) {
    // update existing shop
    const updateInput: UpdateUserShopInput = { ...createShopInput, ownerId: user.id };
    return await this.updateShopData(updateInput, user.id, 'en');
  }

  try {
    // console.log(createShopInput.collaborationType,"collaborationType");
    const shopData: any = {
      ...createShopInput,
      ownerId: user.id,
      verified: false,
      geoLocation: {
        coordinates: [
          createShopInput.location?.long ?? 0,
          createShopInput.location?.lat ?? 0,
        ],
      },
      name: {
        set: createShopInput.name?.map((text) => ({
          ...text,
          value: String(text.value),
        })) || [],
      },
      companyName:{
        set: createShopInput.companyName?.map((text) => ({
          ...text,
          value: String(text.value),
        })) || [],
      },
      description: {
        set: createShopInput.description?.map((text) => ({
          ...text,
          value: String(text.value),
        })) || [],
      },
      members:
        createShopInput.collaborationType === 'company' &&
        createShopInput.members?.length > 0
          ? {
              create: createShopInput.members.map((member) => ({
                memberType: Array.isArray(member.memberType)
                  ? member.memberType
                  : [member.memberType],
                firstName: member.firstName,
                lastName: member.lastName,
                email: member.email,
                birthDate: member.birthDate ? new Date(member.birthDate) : null,
                idNumber: member.idNumber,
                idExpiration: member.idExpiration
                  ? new Date(member.idExpiration)
                  : null,
                phone: member.phone,
                address: member.address,
                city: member.city,
                state: member.state,
                postalCode: member.postalCode,
                country: member.country,
              })),
            }
          : undefined, // ✅ explicitly undefined for individual shops
    };
    

    
    // Only assign `members` if collaborationType is 'company' and array is non-empty
  
    

    const createdShop = await this.prisma.shop.create({
      data: shopData,
      include: { members: true },
    });

    this.eventBus.publish<ShopCreatedEvent>(
      new ShopCreatedEvent(user.id, createdShop),
    );

    return this.formatShopData(createdShop);
  } catch (error: any) {
    this.eventBus.publish<ShopCreationFailedEvent>(
      new ShopCreationFailedEvent(error),
    );
    throw new InternalServerErrorException(error.message || error);
  }
}




  async hasShop(userId: string): Promise < boolean > {
  const shop = await this.prisma.shop.findFirst({
    where: {
      ownerId: userId,
    },
  });

  return !!shop;
}

  async getShopByOwnerId(
  ownerId: string,
  langId: UserPreferedLang,
): Promise < ShopEntity > {
  const shop = await this.prisma.shop.findUnique({
    where: {
      ownerId,
    },
  });

  return this.formatShopData(shop, langId);
}

  async findAll() {
  try {
    const shops = await this.prisma.shop.findMany();

    return shops;
  } catch (error: any) {
    throw new Error(error);
  }
}

  async getShopById(id: string, langId: UserPreferedLang): Promise < ShopEntity > {
  const shop = await this.prisma.shop.findUnique({
    where: {
      id,
    },
  });

  return this.formatShopData(shop, langId);
}

  async removeAllShops(): Promise < boolean > {
  try {
    await this.prisma.shop.deleteMany();
    return true;
  } catch(error: any) {
    throw new Error(error);
  }
}

  async getNearShops(
  input: GetNearShopsInput,
  langId: UserPreferedLang,
): Promise < ShopEntity[] > {
  const shops = (await this.prisma.shop.aggregateRaw({
    pipeline: [
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [input.lon, input.lat] },
          spherical: true,
          query: { storeType: input.storeType },
          distanceField: 'distance',
        },
      },
      { $limit: input.take },
    ],
  })) as unknown as Shop[];

  return shops.map((v, i) => this.formatShopData(v, langId));
}

//   async updateShopData(
//   input: UpdateUserShopInput,
//   userId: string,
//   langId: UserPreferedLang,
// ): Promise < ShopEntity > {
//   try {
//     const shop = await this.prisma.shop.update({
//       where: {
//         ownerId: userId,
//       },
//       data: {
//         ...input,
//         name: input.name?.map((text) => ({ ...text, value: String(text.value) })),
//         description: input.description?.map((text) => ({ ...text, value: String(text.value) })),
//       },
//     });

//     return this.formatShopData(shop, langId);
//   } catch(error) {
//     throw new BadRequestException('error validating shop authority');
//   }
// }
async updateShopData(
  input: UpdateUserShopInput,
  userId: string,
  langId: UserPreferedLang,
): Promise<ShopEntity> {
  try {
   
    const shop = await this.prisma.shop.update({
      where: { ownerId: userId },
      data: {
        ...input,
        companyName:input.companyName?.map((t) => ({ ...t, value: String(t.value) })),
        name: input.name?.map((t) => ({ ...t, value: String(t.value) })),
        description: input.description?.map((t) => ({ ...t, value: String(t.value) })),
        images: input.images?.map(img => img.src),  // only store URLs
        videos: input.videos?.map(video => video.src),
        members:
        input.collaborationType === 'company' &&
        input.members?.length > 0
          ? {
              upsert: input.members
                .filter((member) => member.id) // only upsert if id exists
                .map((member) => ({
                  where: { id: member.id! },
                  create: {
                    memberType: Array.isArray(member.memberType)
                      ? member.memberType
                      : [member.memberType],
                    firstName: member.firstName,
                    lastName: member.lastName,
                    email: member.email,
                    birthDate: member.birthDate ? new Date(member.birthDate) : null,
                    idNumber: member.idNumber,
                    idExpiration: member.idExpiration ? new Date(member.idExpiration) : null,
                    phone: member.phone,
                    address: member.address,
                    city: member.city,
                    state: member.state,
                    postalCode: member.postalCode,
                    country: member.country,
                  },
                  update: {
                    memberType: Array.isArray(member.memberType)
                      ? member.memberType
                      : [member.memberType],
                    firstName: member.firstName,
                    lastName: member.lastName,
                    email: member.email,
                    birthDate: member.birthDate ? new Date(member.birthDate) : null,
                    idNumber: member.idNumber,
                    idExpiration: member.idExpiration ? new Date(member.idExpiration) : null,
                    phone: member.phone,
                    address: member.address,
                    city: member.city,
                    state: member.state,
                    postalCode: member.postalCode,
                    country: member.country,
                  },
                })),
              create: input.members
                .filter((member) => !member.id) // only create if id does NOT exist
                .map((member) => ({
                  memberType: Array.isArray(member.memberType)
                    ? member.memberType
                    : [member.memberType],
                  firstName: member.firstName,
                  lastName: member.lastName,
                  email: member.email,
                  birthDate: member.birthDate ? new Date(member.birthDate) : null,
                  idNumber: member.idNumber,
                  idExpiration: member.idExpiration ? new Date(member.idExpiration) : null,
                  phone: member.phone,
                  address: member.address,
                  city: member.city,
                  state: member.state,
                  postalCode: member.postalCode,
                  country: member.country,
                })),
            }
          : undefined,
      
      },
    });

    return this.formatShopData(shop, langId);
  } catch (error) {
    console.log(error ,"errr");
    
    throw new BadRequestException(error);
  }
}


  async getFilteredShops(
  input: FilteredShopsInput,
  langId: UserPreferedLang,
): Promise < ShopEntity[] > {
  const searchQueries = [];
  const { skip, take } = ExtractPagination(input.pagination);

  if(input.storeType) {
  searchQueries.push({
    storeType: {
      has: input.storeType,
    },
  });
}
if (input.targetGender) {
  searchQueries.push({
    targetGenders: {
      has: input.targetGender,
    },
  });
}
if (input.businessType) {
  searchQueries.push({
    vendorType: {
      has: input.businessType,
    },
  });
}
if (input.country) {
  searchQueries.push({
    location: {
      is: {
        country: input.country,
      },
    },
  });
}
if (input.city) {
  searchQueries.push({
    location: {
      is: {
        city: input.city,
      },
    },
  });
}

const shops = await this.prisma.shop.findMany({
  where: {
    AND: searchQueries,
  },
  skip,
  take,
});

return shops.map((v) => this.formatShopData(v, langId));
  }

formatShopData(shop: Shop, langId: string = 'en'): ShopEntity {
  shop.videos;
  return {
    ...shop,
    name: getTranslatedResource({ langId, resource: shop.name }),
    description: getTranslatedResource({
      langId,
      resource: shop.description,
    }),
  };
}
}
