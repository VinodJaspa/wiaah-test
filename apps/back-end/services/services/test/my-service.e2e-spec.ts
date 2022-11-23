import { CreateHotelInput } from '@hotel/dto';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CreateRestaurantInput } from '@restaurant';
import {
  accountType,
  AuthorizationDecodedUser,
  mockedUser,
  requestGraphql,
  secendMockedUser,
} from 'nest-utils';
import { PrismaClient } from 'prismaClient';
import { AppModule } from '../src/app.module';

let mockSeller = { ...mockedUser, accountType: accountType.SELLER };

describe('MyService service management menu tests', () => {
  let app: INestApplication;
  let prisma = new PrismaClient();

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  it('should create hotel service', async () => {
    const createHotelServiceMutation = `
    mutation create(
        $presentations:[ServicePresentationInput!]!
        $location:ServiceLocationInput!
        $policies:[ServicePolicyTranslatedInput!]!
        $serviceMetaInfo:[ServiceMetaInfoTranslationInput!]!
        $rooms:[HotelRoomInput!]!
    ){
        createHotelService(
            createHotelServiceArgs:{
                presentations:$presentations
                location:$location
                policies:$policies
                serviceMetaInfo:$serviceMetaInfo
                rooms:$rooms
            }

        ){
            id
        }
    }
    `;

    const createInput: CreateHotelInput = {
      serviceMetaInfo: [
        {
          langId: 'en',
          value: {
            title: 'en title',
            description: 'en desc',
            hashtags: ['en'],
            metaTagDescription: 'meta desc',
            metaTagKeywords: ['en'],
          },
        },
      ],
      location: {
        address: 'address',
        city: 'city',
        country: 'country',
        lat: 114,
        lon: 15,
        postalCode: 12364,
        state: 'State',
      },
      policies: [
        {
          langId: 'en',
          value: [
            { policyTitle: 'en p title', terms: ['term one', 'term two'] },
          ],
        },
      ],
      presentations: [
        {
          src: 'test src',
          type: 'img',
        },
      ],
      rooms: [
        {
          bathrooms: 4,
          beds: 4,
          cancelationPolicies: [{ cost: 4, duration: 15 }],
          discount: {
            units: 5,
            value: 15,
          },
          extras: [
            {
              cost: 12,
              name: [
                {
                  langId: 'en',
                  value: 'en ex',
                },
              ],
            },
          ],
          includedAmenities: [{ langId: 'en', value: ['en am'] }],
          includedServices: [{ langId: 'en', value: ['test'] }],
          measurements: {
            inFeet: 40,
            inMeter: 12,
          },
          num_of_rooms: 2,
          pricePerNight: 150,
          popularAmenities: [
            {
              label: [{ langId: 'en', value: 'en ame' }],
              value: 'ame',
            },
          ],
          roomMetaInfo: [
            {
              langId: 'en',
              value: {
                title: 'en room t',
                description: 'en room d',
              },
            },
          ],
          dailyPrice: false,
        },
      ],
    };

    const res = await reqGql(
      createHotelServiceMutation,
      createInput,
      mockSeller,
    );

    expect(res.body.errors).not.toBeDefined();
    const hotels = await prisma.hotelService.findMany();
    expect(hotels).toHaveLength(1);
    const { rooms: _rooms, ...hotel } = createInput;
    expect(hotels.at(0)).toMatchObject(hotel);

    const rooms = await prisma.hotelRoom.findMany();
    expect(rooms).toHaveLength(1);
    expect(rooms.at(0)).toMatchObject(_rooms[0]);
  });

  it('should create restaurant service', async () => {
    const createRestaurantServiceMutation = `
    mutation create(
        $presentations:[ServicePresentationInput!]!
        $location:ServiceLocationInput!
        $policies:[ServicePolicyTranslatedInput!]!
        $serviceMetaInfo:[ServiceMetaInfoTranslationInput!]!
        $menus:[RestaurantMenuInput!]!
        $establishmentTypeId: ID!
        $cuisinesTypeId:ID!
        $setting_and_ambianceId:ID!
        $michelin_guide_stars:Int!
        $status:ServiceStatus
        $payment_methods:[ServicePaymentMethods!]!
        $vat:Int!
        
    ){
        createRestaurantService(
            createRestaurantArgs:{
                presentations:$presentations
                location:$location
                policies:$policies
                serviceMetaInfo:$serviceMetaInfo
                menus:$menus
                establishmentTypeId:$establishmentTypeId
                cuisinesTypeId:$cuisinesTypeId
                setting_and_ambianceId:$setting_and_ambianceId
                michelin_guide_stars:$michelin_guide_stars
                status:$status
                payment_methods:$payment_methods
                vat:$vat
            }

        ){
            id
        }
    }
    `;

    const createInput: CreateRestaurantInput = {
      serviceMetaInfo: [
        {
          langId: 'en',
          value: {
            title: 'en title',
            description: 'en desc',
            hashtags: ['en'],
            metaTagDescription: 'meta desc',
            metaTagKeywords: ['en'],
          },
        },
      ],
      location: {
        address: 'address',
        city: 'city',
        country: 'country',
        lat: 114,
        lon: 15,
        postalCode: 12364,
        state: 'State',
      },
      policies: [
        {
          langId: 'en',
          value: [
            { policyTitle: 'en p title', terms: ['term one', 'term two'] },
          ],
        },
      ],
      presentations: [
        {
          src: 'test src',
          type: 'img',
        },
      ],
      cuisinesTypeId: secendMockedUser.shopId,
      establishmentTypeId: secendMockedUser.id,
      setting_and_ambianceId: mockedUser.shopId,
      michelin_guide_stars: 5,
      payment_methods: ['credit_card', 'cash'],
      status: 'active',
      vat: 5,
      menus: [
        {
          dishs: [
            {
              name: [{ langId: 'en', value: 'en dish name' }],
              price: 5,
              thumbnail: 'src',
              ingredients: [{ langId: 'en', value: ['tomato', 'onion'] }],
            },
          ],
          name: [{ langId: 'en', value: 'en menu name' }],
        },
      ],
    };

    const res = await reqGql(
      createRestaurantServiceMutation,
      createInput,
      mockSeller,
    );

    expect(res.body.errors).not.toBeDefined();
    const restaurants = await prisma.restaurantService.findMany();
    expect(restaurants).toHaveLength(1);
    const { menus: _menus, ...rest } = createInput;
    expect(restaurants.at(0)).toMatchObject(rest);

    const menus = (await prisma.restaurantService.findFirst()).menus;
    expect(menus).toHaveLength(1);
    expect(menus.at(0)).toMatchObject(_menus[0]);
  });
});
