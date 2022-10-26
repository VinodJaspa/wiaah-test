import { Test, TestingModule } from '@nestjs/testing';
import { mockedUser, secendMockedUser } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { CreateRestaurantInput, UpdateRestaurantInput } from './dto';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';
import { ObjectId } from 'mongodb';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { ServiceOwnershipModule } from '@service-ownership';

describe('RestaurantResolver', () => {
  let resolver: RestaurantResolver;
  let service: RestaurantService;
  let prisma: PrismaService;

  let input: CreateRestaurantInput = {
    vat: 15,
    cuisinesTypeId: new ObjectId().toHexString(),
    establishmentTypeId: new ObjectId().toHexString(),
    menus: [],
    michelin_guide_stars: 1,
    payment_methods: ['cash', 'credit_card'],
    location: {
      address: 'address',
      city: 'city',
      country: 'country',
      lat: 15,
      lon: 13,
      postalCode: 13245,
      state: 'state',
    },
    policies: [
      {
        langId: 'es',
        value: [
          {
            policyTitle: 'es t',
            terms: ['es te'],
          },
        ],
      },
      {
        langId: 'en',
        value: [
          {
            policyTitle: 'en t',
            terms: ['en te'],
          },
        ],
      },
      {
        langId: 'fr',
        value: [
          {
            policyTitle: 'fr t',
            terms: ['fr te'],
          },
        ],
      },
    ],
    presentations: [
      {
        src: 'src test',
        type: 'img',
      },
    ],
    serviceMetaInfo: [
      {
        langId: 'en',
        value: {
          title: 'en title',
          description: 'en desc',
          hashtags: ['en'],
          metaTagDescription: 'en meta desc',
          metaTagKeywords: ['en', 'meta'],
        },
      },
      {
        langId: 'fr',
        value: {
          title: 'fr title',
          description: 'fr desc',
          hashtags: ['fr'],
          metaTagDescription: 'fr meta desc',
          metaTagKeywords: ['fr', 'meta'],
        },
      },
      {
        langId: 'es',
        value: {
          title: 'es title',
          description: 'es desc',
          hashtags: ['es'],
          metaTagDescription: 'es meta desc',
          metaTagKeywords: ['es', 'meta'],
        },
      },
    ],
    setting_and_ambianceId: new ObjectId().toHexString(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServiceOwnershipModule],
      providers: [RestaurantResolver, RestaurantService, PrismaService],
    }).compile();

    resolver = module.get<RestaurantResolver>(RestaurantResolver);
    service = module.get<RestaurantService>(RestaurantService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create restaurant', async () => {
    const created = await resolver.createRestaurant(input, mockedUser, 'en');
    const restaurants = await prisma.restaurantService.findMany();

    expect(restaurants.length).toBe(1);
    expect(restaurants.at(0).id).toBe(created.id);
  });

  it('should update restaurant', async () => {
    const created = await resolver.createRestaurant(input, mockedUser, 'en');

    let updatedInput: UpdateRestaurantInput = {
      id: created.id,
      menus: [],
      michelin_guide_stars: 4,
      payment_methods: ['cash'],
      policies: [],
      presentations: [{ src: 'test', type: 'img' }],
      serviceMetaInfo: [
        {
          langId: 'en',
          value: {
            description: 'updated',
            hashtags: ['updated'],
            metaTagDescription: 'updated',
            metaTagKeywords: ['updated'],
            title: 'updated',
          },
        },
      ],
      status: 'active',
      vat: 8,
    };

    let tested = false;

    try {
      await resolver.updateRestaurant(updatedInput, secendMockedUser, 'en');
    } catch (error) {
      expect(error instanceof UnauthorizedException).toBe(true);
      tested = true;
    }
    expect(tested).toBe(true);

    await resolver.updateRestaurant(updatedInput, mockedUser, 'en');
    const res = await prisma.restaurantService.findUnique({
      where: { id: created.id },
    });
    expect(res).toEqual(expect.objectContaining(updatedInput));
    expect(res.status).toBe('active');
  });

  it('should activate service', async () => {
    const created = await resolver.createRestaurant(
      { ...input, status: undefined },
      mockedUser,
      'en',
    );

    expect((await prisma.restaurantService.findFirst()).status).toBe(
      'inActive',
    );

    let errored = false;

    try {
      await resolver.activateRestaurant(created.id, secendMockedUser);
    } catch (error) {
      errored = true;
    }

    expect(errored).toBe(true);
    expect((await prisma.restaurantService.findFirst()).status).toBe(
      'inActive',
    );

    await resolver.activateRestaurant(created.id, mockedUser);

    expect((await prisma.restaurantService.findFirst()).status).toBe('active');
  });

  it('should prevent user from viewing the restaurant if its not active', async () => {
    const created = await resolver.createRestaurant(input, mockedUser, 'en');

    let tested = false;
    try {
      await resolver.getRestaurant({ id: created.id }, mockedUser, 'en');
    } catch (error) {
      const isInstance = error instanceof ForbiddenException;
      expect(isInstance).toBe(true);
      tested = true;
    }

    expect(tested).toBe(true);

    await resolver.activateRestaurant(created.id, mockedUser);

    const res = await resolver.getRestaurant(
      { id: created.id },
      mockedUser,
      'en',
    );

    expect(res).toBeDefined();
    expect(res.id).toBe(created.id);
  });

  it('should get restaurant with diff languages', async () => {
    const created = await resolver.createRestaurant(
      { ...input, status: 'active' },
      mockedUser,
      'en',
    );
    const langs = ['en', 'fr', 'es'];
    const tested: string[] = [];
    for (const lang of langs) {
      const res = await resolver.getRestaurant(
        { id: created.id },
        mockedUser,
        lang,
      );
      expect(res.serviceMetaInfo).toStrictEqual(
        input.serviceMetaInfo.find((v) => v.langId === lang).value,
      );
      tested.push(lang);
    }

    expect(tested.length).toBe(3);
  });

  it('should delete restaurant', async () => {
    const created = await resolver.createRestaurant(input, mockedUser, 'en');

    let tested = false;
    try {
      await resolver.deleteRestaurant(
        {
          id: created.id,
        },
        secendMockedUser,
        'en',
      );
    } catch (error) {
      expect(error instanceof UnauthorizedException).toBe(true);
      tested = true;
    }

    expect(tested).toBe(true);

    expect((await prisma.restaurantService.findMany()).length).toBe(1);

    await resolver.deleteRestaurant(
      {
        id: created.id,
      },
      mockedUser,
      'en',
    );
    expect((await prisma.restaurantService.findMany()).length).toBe(0);
  });

  it('should not be able to create resaurant if he already owns a service', async () => {
    const created = await resolver.createRestaurant(input, mockedUser, 'en');

    expect(await prisma.restaurantService.count()).toBe(1);

    let tested = false;
    try {
      await resolver.createRestaurant(input, mockedUser, 'en');
    } catch (error) {
      expect(error instanceof ForbiddenException).toBe(true);
      tested = true;
    }

    expect(tested).toBe(true);
    expect(await prisma.restaurantService.count()).toBe(1);
  });
});
