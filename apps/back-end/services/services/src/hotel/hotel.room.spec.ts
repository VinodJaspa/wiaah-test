import { ServiceLocation } from '@entities';
import { Global, Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { Test } from '@nestjs/testing';
import { mockedUser, waitFor } from 'nest-utils';

import { CreateHotelInput } from './dto';
import { HotelRoomResolver } from './hotel-room.resolver';
import { HotelModule } from './hotel.module';
import { HotelResolver } from './hotel.resolver';

@Global()
@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
      auth: {
        password: 'admin123',
        username: 'admin',
      },
    }),
  ],
  exports: [ElasticsearchModule],
})
class GlobalElasticsearchModule {}

describe('Hotel resolver tests', () => {
  let resolver: HotelResolver;
  let roomResolver: HotelRoomResolver;

  const createHotelInput: CreateHotelInput = {
    location: {
      address: 'address',
      city: 'city',
      country: 'country',
      state: 'state',
      lat: 15,
      lon: 32,
      postalCode: 2345,
    },
    serviceMetaInfo: [
      {
        langId: 'en',
        value: {
          description: 'en desc',
          hashtags: ['en'],
          metaTagDescription: 'en meta desc',
          metaTagKeywords: ['en', 'meta', 'keywords'],
          title: 'en title',
        },
      },
      {
        langId: 'fr',
        value: {
          description: 'fr desc',
          hashtags: ['fr'],
          metaTagDescription: 'fr meta desc',
          metaTagKeywords: ['fr', 'meta', 'keywords'],
          title: 'fr title',
        },
      },
      {
        langId: 'es',
        value: {
          description: 'es desc',
          hashtags: ['es'],
          metaTagDescription: 'es meta desc',
          metaTagKeywords: ['es', 'meta', 'keywords'],
          title: 'es title',
        },
      },
    ],
    policies: [
      {
        langId: 'en',
        value: [
          {
            policyTitle: 'en policy title',
            terms: ['en policy term 1'],
          },
        ],
      },
      {
        langId: 'fr',
        value: [
          {
            policyTitle: 'fr policy title',
            terms: ['fr policy term 1'],
          },
        ],
      },
      {
        langId: 'es',
        value: [
          {
            policyTitle: 'es policy title',
            terms: ['es policy term 1'],
          },
        ],
      },
    ],
    presentations: [{ src: 'test src', type: 'img' }],
    rooms: [
      {
        bathrooms: 2,
        beds: 4,
        cancelationPolicies: [],
        dailyPrice: false,
        discount: {
          units: 4,
          value: 15,
        },
        extras: [],
        includedAmenities: [],
        includedServices: [],
        measurements: {
          inFeet: 15,
          inMeter: 4,
        },
        num_of_rooms: 5,
        popularAmenities: [],
        pricePerNight: 150,
        roomMetaInfo: [
          {
            langId: 'en',
            value: {
              description: 'en room desc',
              title: 'en room title',
            },
          },
        ],
        dailyPrices: null,
      },
    ],
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HotelModule, GlobalElasticsearchModule],
    }).compile();

    await moduleRef.init();

    resolver = moduleRef.get(HotelResolver);
    roomResolver = moduleRef.get(HotelRoomResolver);

    const locations: ServiceLocation[] = [
      {
        address: '4951 Eden Drive',
        city: 'Thousand Oaks',
        state: 'California',
        postalCode: 91362,
        lat: 34.197189,
        lon: -118.831284,
        country: 'united states',
      },
      {
        address: '4509 Riverwood Drive',
        city: 'Rancho Cordova',
        country: 'united states',
        state: 'California',
        postalCode: 95670,
        lat: 38.668301,
        lon: -121.264191,
      },
      {
        address: '536 Tennessee Avenue',
        city: 'Southfield',
        state: 'Michigan',
        postalCode: 48075,
        country: 'united states',
        lat: 42.496227,
        lon: -83.295128,
      },
      {
        address: 'rue de Jourdan',
        state: 'Couturier',
        city: 'Andre-sur-Delannoy',
        country: 'France',
        postalCode: 19828,
        lat: 135,
        lon: 46,
      },
    ];

    for (const loc of locations) {
      await resolver.createHotelService(
        {
          ...createHotelInput,
          location: loc,
        },
        mockedUser,
        'en',
      );
    }
  });

  it('should return matched hotels with the location query by the address', async () => {
    const searchedServices = await roomResolver.searchHotelRooms(
      {
        query: '4951 Eden Drive',
      },
      'en',
      undefined,
    );

    await waitFor(() => {
      expect(searchedServices.length).toBe(1);
      expect(searchedServices[0]).toMatchObject(createHotelInput);
    });
  });
});
