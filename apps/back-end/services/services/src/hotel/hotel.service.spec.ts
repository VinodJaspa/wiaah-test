import { ServiceMetaInfo } from '@entities';
import { Test, TestingModule } from '@nestjs/testing';
import { mockedUser } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { CreateHotelInput } from './dto';
import { HotelService } from './hotel.service';

describe('HotelService', () => {
  let service: HotelService;
  let prisma: PrismaService;

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
    rooms: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelService, PrismaService],
    }).compile();

    service = module.get<HotelService>(HotelService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hotel info without rooms', () => {
    it('should create hotel', async () => {
      const hotel = await service.createHotelService(
        createHotelInput,
        mockedUser.id,
        'en',
      );

      const fetchedHotel = await service.getHotelWithRoomsById(
        hotel.id,
        mockedUser.id,
        'en',
        undefined,
      );
      const hotels = await prisma.hotelService.findMany();

      expect(hotels.length).toBe(1);
      expect(hotels.at(0).id).toBe(hotel.id);
      expect(hotels.at(0).ownerId).toBe(mockedUser.id);
      expect(hotel).toStrictEqual(fetchedHotel);
    });

    it('should get hotel with the right id, and with the right translation', async () => {
      const created = await service.createHotelService(
        createHotelInput,
        mockedUser.id,
        'fr',
      );

      const langTested: boolean[] = [];
      const langs = ['en', 'es', 'fr'];

      for (const lang of langs) {
        const hotel = await service.getHotelWithRoomsById(
          created.id,
          mockedUser.id,
          lang,
          undefined,
        );

        expect(hotel.serviceMetaInfo).toStrictEqual<ServiceMetaInfo>({
          description: `${lang} desc`,
          hashtags: [`${lang}`],
          metaTagDescription: `${lang} meta desc`,
          metaTagKeywords: [lang, 'meta', 'keywords'],
          title: `${lang} title`,
        });

        langTested.push(true);
      }

      expect(langTested.length).toBe(langs.length);
      expect(langTested.every((v) => v)).toBe(true);
    });
  });
});
