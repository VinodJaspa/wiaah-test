import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ShopService, CreateShopInput } from '@shop';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { mockedUser, SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';

describe('Shop service unit testing', () => {
  let service: ShopService;
  let dbSerivce: PrismaService;
  let mockMongo: MongoMemoryReplSet;
  let mockKafkaEmit: jest.Mock;

  let createShopInput: CreateShopInput = {
    name: 'test shop name',
    location: {
      address: 'test address',
      city: 'test city',
      country: 'test city',
      lat: 13,
      long: 13,
      state: 'test state',
    },
    storeType: ['type1'],
    targetGenders: ['female', 'male'],
    vendorType: ['vendor1'],
  };

  afterEach(async () => await mockMongo.stop());

  beforeEach(async () => {
    mockKafkaEmit = jest.fn();
    mockMongo = await MongoMemoryReplSet.create({
      replSet: { count: 1 },
      instanceOpts: [{ storageEngine: 'wiredTiger' }],
    });
    process.env.DATABASE_URL = mockMongo.getUri('testDB');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

  it('should get near shops to the given coordinates', async () => {
    for (const shopData of shopsPh) {
      await dbSerivce.shop.create({
        data: {
          ...shopData,
          ownerId: mockedUser.id,
        },
      });
    }

    const nearShops = await service.getNearShops({
      lat: 32,
      lon: 20,
      distance: 20,
    });

    console.log(nearShops);
  });
});

const shopsPh: CreateShopInput[] = [
  {
    name: 'test',
    storeType: ['type1', 'type2'],
    targetGenders: ['male'],
    vendorType: ['vendor3'],
    location: {
      lat: 32.00063711672341,
      long: 20.000751274280667,
      address: 'address',
      city: 'idk',
      country: 'idk',
      state: 'test',
    },
  },
  {
    name: 'test',
    storeType: ['type3'],
    targetGenders: ['female'],
    vendorType: ['vendor1'],
    location: {
      lat: 55,
      long: 53,
      address: 'address',
      city: 'idk',
      country: 'idk',
      state: 'test',
    },
  },
  {
    name: 'test',
    storeType: ['type2'],
    targetGenders: ['male', 'female'],
    vendorType: ['vendor2'],
    location: {
      lat: 90,
      long: 93,
      address: 'address',
      city: 'idk',
      country: 'idk',
      state: 'test',
    },
  },
  {
    name: 'test',
    storeType: ['type1', 'type2'],
    targetGenders: ['male'],
    vendorType: ['vendor3'],
    location: {
      lat: 64,
      long: 65,
      address: 'address',
      city: 'idk',
      country: 'idk',
      state: 'test',
    },
  },
  {
    name: 'test',
    storeType: ['type1', 'type2'],
    targetGenders: ['male'],
    vendorType: ['vendor3'],
    location: {
      lat: 5,
      long: 7,
      address: 'address',
      city: 'idk',
      country: 'idk',
      state: 'test',
    },
  },
];
