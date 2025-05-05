import { UnprocessableEntityException } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ShopService, CreateShopInput, Shop } from '@shop';
import { mockedUser, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';

describe('Shop service unit testing', () => {
  let service: ShopService;
  let dbSerivce: PrismaService;
  let mockKafkaEmit: jest.Mock;

  const createShopInput: CreateShopInput = {
    name: 'test shop name',
    location: {
      address: 'test address',
      city: 'test city',
      country: 'test city',
      lat: 13,
      long: 13,
      state: 'test state',
    },
    storeType: ['product'],
    targetGenders: ['female', 'male'],
    vendorType: ['individual'],
    banner: 'test.jpeg',
    description: 'test desc',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CqrsModule,
        ShopService,
        PrismaService,
        {
          provide: SERVICES.PRODUCTS_SERVICE.token,
          useValue: {
            emit: mockKafkaEmit,
          },
        },
      ],
    }).compile();

    service = module.get<ShopService>(ShopService);
    dbSerivce = module.get<PrismaService>(PrismaService);
  });

  function createShop() {
    return service.CreateShop(createShopInput, mockedUser);
  }

  it('should create shop and reject if the user already own one', async () => {
    expect((await service.findAll()).length).toBe(0);

    await createShop();

    expect((await service.findAll()).length).toBe(1);

    let duplicationTested = false;
    try {
      await createShop();
    } catch (error) {
      const isInstance = error instanceof UnprocessableEntityException;
      expect(isInstance).toBe(true);
      duplicationTested = true;
    }

    expect(duplicationTested).toBe(true);
    expect((await service.findAll()).length).toBe(1);
  });

  it('should get shop by its owner id', async () => {
    console.log(await service.findAll());
    expect((await service.findAll()).length).toBe(0);
    const created = await createShop();

    const shop = await service.getShopByOwnerId(created.ownerId);
    expect(shop).toBeDefined();

    expect(shop.ownerId).toBe(created.ownerId);
  });

  it('should get shop by its id', async () => {
    const created = await createShop();

    const shop = await service.getShopById(created.id);
    expect(shop).toBeDefined();

    expect(shop.id).toBe(created.id);
  });

  describe('get nearby shops algorithm, should get near shops with max distance of', () => {
    const lat = 32;
    const lon = 20;
    let nearShops: Shop[];

    beforeEach(async () => {
      for (const shopData of shopsPh) {
        await dbSerivce.shop.create({
          data: {
            ...shopData,
            ownerId: mockedUser.id,
            verified: false,
          },
        });
      }
    });

    it('20 km', async () => {
      nearShops = await service.getNearShops({
        lat,
        lon,
        distance: 20,
      });

      expect(nearShops.length).toBe(1);
    });

    it('150 km', async () => {
      nearShops = await service.getNearShops({
        lat,
        lon,
        distance: 150,
      });

      expect(nearShops.length).toBe(2);
    });

    it('400 km', async () => {
      nearShops = await service.getNearShops({
        lat,
        lon,
        distance: 400,
      });

      expect(nearShops.length).toBe(3);
    });

    it('1000 km', async () => {
      nearShops = await service.getNearShops({
        lat,
        lon,
        distance: 1000,
      });

      expect(nearShops.length).toBe(4);
    });
    it('1700 km', async () => {
      nearShops = await service.getNearShops({
        lat,
        lon,
        distance: 1700,
      });

      expect(nearShops.length).toBe(5);
    });
  });

  describe('shop search with filters tests, should return only shops contains the filter', () => {
    let shops: Shop[];

    beforeEach(async () => {
      for (const shopData of shopsPh) {
        await dbSerivce.shop.create({
          data: {
            ...shopData,
            ownerId: mockedUser.id,
            verified: false,
          },
        });
      }
    });

    it('storeType', async () => {
      shops = await service.getFilteredShops({
        storeType: 'product',
      });

      expect(shops.every((v) => v.storeType.includes('product'))).toBe(true);
    });

    it('target gender', async () => {
      shops = await service.getFilteredShops({
        targetGender: 'male',
      });

      expect(shops.every((v) => v.targetGenders.includes('male'))).toBe(true);

      shops = await service.getFilteredShops({
        targetGender: 'female',
      });

      expect(shops.every((v) => v.targetGenders.includes('female'))).toBe(true);
    });

    it('vendorType', async () => {
      shops = await service.getFilteredShops({
        vendorType: 'individual',
      });

      expect(shops.every((v) => v.vendorType.includes('individual'))).toBe(
        true,
      );
    });

    it('country', async () => {
      shops = await service.getFilteredShops({
        country: 'usa',
      });

      expect(shops.every((v) => v.location.country === 'usa')).toBe(true);
      expect(shops.every((v) => v.location.country === 'uk')).toBe(false);
    });

    it('city', async () => {
      shops = await service.getFilteredShops({
        city: 'cario',
      });

      expect(shops.every((v) => v.location.city === 'cario')).toBe(true);
      expect(shops.every((v) => v.location.city === 'geneve')).toBe(false);
    });
  });
});

const shopsPh: CreateShopInput[] = [
  {
    name: 'test',
    banner: 'test.jpeg',
    description: 'test desc',
    storeType: ['product', 'service'],
    targetGenders: ['male'],
    vendorType: ['profissional'],
    location: {
      lat: 32.00063711672341,
      long: 20.000751274280667,
      address: 'address',
      city: 'cario',
      country: 'usa',
      state: 'test',
    },
  },
  {
    name: 'test',
    storeType: ['product'],
    banner: 'test.jpeg',
    description: 'test desc',
    targetGenders: ['female'],
    vendorType: ['individual'],
    location: {
      lat: 33,
      long: 21,
      address: 'address',
      city: 'cario',
      country: 'usa',
      state: 'test',
    },
  },
  {
    name: 'test',
    storeType: ['service'],
    banner: 'test.jpeg',
    description: 'test desc',
    targetGenders: ['male', 'female'],
    vendorType: ['profissional'],
    location: {
      lat: 35,
      long: 22,
      address: 'address',
      city: 'geneve',
      country: 'uk',
      state: 'test',
    },
  },
  {
    name: 'test',
    storeType: ['product', 'service'],
    banner: 'test.jpeg',
    description: 'test desc',
    targetGenders: ['male'],
    vendorType: ['profissional'],
    location: {
      lat: 40,
      long: 25,
      address: 'address',
      city: 'geneve',
      country: 'uk',
      state: 'test',
    },
  },
  {
    name: 'test',
    storeType: ['product', 'service'],
    banner: 'test.jpeg',
    description: 'test desc',
    targetGenders: ['male'],
    vendorType: ['profissional'],
    location: {
      lat: 45,
      long: 30,
      address: 'address',
      city: 'geneve',
      country: 'as',
      state: 'test',
    },
  },
];
