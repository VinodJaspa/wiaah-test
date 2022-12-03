import { Test } from '@nestjs/testing';
import { KAFKA_MESSAGES, mockedUser, SERVICES, waitFor } from 'nest-utils';

import { LocalizationResolver } from './Localization.resolver';
import { SearchElasticRepository, SearchRepository } from './repository';
import { CqrsModule } from '@nestjs/cqrs';
import { searchCommandHandlers } from './commands';
import {
  GetServicesOpenTimeDataMessage,
  GetServicesOpenTimeDataMessageReply,
  GetShopOpenTimeMessage,
  GetShopOpenTimeMessageReply,
} from 'nest-dto';
import { Localization } from './entities';

jest.useFakeTimers().setSystemTime(new Date(2022));

describe('Localization Tests', () => {
  let resolver: LocalizationResolver;

  let mockElasticGetPropertiesIdsAndTypesByLocationQuery: jest.Mock;
  let mockElasticGetPropertiesIdsByTypeQuery: jest.Mock;
  let mockKafkaEmit: jest.Mock;
  let mockKafkaSend: jest.Mock;
  let mockKafkaSubscribe: jest.Mock;

  beforeEach(async () => {
    mockKafkaEmit = jest.fn();
    mockKafkaSend = jest.fn();
    mockKafkaSubscribe = jest.fn();
    mockElasticGetPropertiesIdsAndTypesByLocationQuery = jest.fn();
    mockElasticGetPropertiesIdsByTypeQuery = jest.fn();

    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        LocalizationResolver,
        SearchElasticRepository,
        SearchRepository,
        {
          provide: SERVICES.SEARCH_SERVICE.token,
          useValue: {
            emit: mockKafkaEmit,
            send: mockKafkaSend,
          },
        },
        ...searchCommandHandlers,
      ],
    })
      .overrideProvider(SearchElasticRepository)
      .useValue({
        getPropertiesIdsByTypeQuery: mockElasticGetPropertiesIdsByTypeQuery,
        getPropertiesIdsAndTypesByLocationQuery:
          mockElasticGetPropertiesIdsAndTypesByLocationQuery,
      })
      .compile();

    await module.init();
    resolver = module.get(LocalizationResolver);
  });

  it('should get localization', async () => {
    const mockSearchData = [
      {
        dbId: '1',
        type: 'hotel',
      },
      {
        dbId: '7',
        type: 'holiday-rentals',
      },
      {
        dbId: '2',
        type: 'restaurant',
      },
      {
        dbId: '3',
        type: 'hotel',
      },
      {
        dbId: '4',
        type: 'health-center',
      },
      {
        dbId: '6',
        type: 'beauty-center',
      },
      {
        dbId: '5',
        type: 'vehicle',
      },
      {
        dbId: '8',
        type: 'shop',
      },
    ];
    mockElasticGetPropertiesIdsAndTypesByLocationQuery.mockReturnValue(
      mockSearchData,
    );
    const mockfilteredData = mockSearchData.reduce((acc, curr) => {
      const typeAcc = Array.isArray(acc[curr.type]) ? [...acc[curr.type]] : [];
      return { ...acc, [curr.type]: [...typeAcc, curr.dbId] };
    }, {} as Record<string, string[]>);

    mockKafkaSend.mockImplementation(
      (
        pattern,
        input: GetServicesOpenTimeDataMessage | GetShopOpenTimeMessage,
      ) => ({
        subscribe:
          pattern ===
          KAFKA_MESSAGES.SERVICES_MESSAGES.getServiceOpenTimeData('shop')
            ? mockKafkaSubscribe.mockImplementation(
                (fn: (data: GetShopOpenTimeMessageReply) => any) => {
                  fn({
                    results: {
                      data: {
                        shops: [
                          {
                            id: 'testid',
                            location: {
                              city: 'new york',
                            },
                            openTime: {
                              from: new Date(),
                              to: new Date(),
                            },
                            sellerId: 'sellerId',
                            thumbnail: 'src',
                          },
                        ],
                      },
                      error: null,
                      success: true,
                    },
                  });
                },
              )
            : mockKafkaSubscribe.mockImplementation(
                (fn: (data: GetServicesOpenTimeDataMessageReply) => any) => {
                  fn({
                    results: {
                      data: {
                        services: [
                          {
                            id: 'testid',
                            location: {
                              city: 'new york',
                            },
                            openTime: {
                              from: new Date(),
                              to: new Date(),
                            },
                            sellerId: 'sellerId',
                            thumbnail: 'srcr',
                            type:
                              input instanceof GetServicesOpenTimeDataMessage
                                ? input.input.services.at(0).type
                                : 'shop',
                          },
                        ],
                      },
                      error: null,
                      success: true,
                    },
                  });
                },
              ),
      }),
    );

    const data = await resolver.getLocalisation(
      { query: 'new york' },
      'en',
      mockedUser,
      undefined,
    );

    expect(mockElasticGetPropertiesIdsAndTypesByLocationQuery).toBeCalledTimes(
      1,
    );
    expect(mockElasticGetPropertiesIdsAndTypesByLocationQuery).toBeCalledWith(
      'new york',
    );

    expect(mockKafkaSend).toBeCalledTimes(7);

    Object.entries(mockfilteredData).forEach(([key, value], idx) => {
      expect(mockKafkaSend.mock.calls[idx]).toMatchObject([
        KAFKA_MESSAGES.SERVICES_MESSAGES.getServiceOpenTimeData(key),
        key === 'shop'
          ? new GetShopOpenTimeMessage({ ids: value })
          : new GetServicesOpenTimeDataMessage({
              services: value.map((v) => ({ id: v, type: key })),
            }),
      ]);
    });

    expect(data).toStrictEqual([
      {
        id: 'testid',
        city: 'new york',
        openTime: {
          from: new Date(),
          to: new Date(),
        },
        sellerId: 'sellerId',
        thumbnail: 'srcr',
        propertyType: 'hotel',
        isOpen: false,
      },
      {
        id: 'testid',
        city: 'new york',
        openTime: {
          from: new Date(),
          to: new Date(),
        },
        sellerId: 'sellerId',
        thumbnail: 'srcr',
        propertyType: 'holiday-rentals',
        isOpen: false,
      },
      {
        id: 'testid',
        city: 'new york',
        openTime: {
          from: new Date(),
          to: new Date(),
        },
        sellerId: 'sellerId',
        thumbnail: 'srcr',
        propertyType: 'restaurant',
        isOpen: false,
      },
      {
        id: 'testid',
        city: 'new york',
        openTime: {
          from: new Date(),
          to: new Date(),
        },
        sellerId: 'sellerId',
        thumbnail: 'srcr',
        propertyType: 'health-center',
        isOpen: false,
      },
      {
        id: 'testid',
        city: 'new york',
        openTime: {
          from: new Date(),
          to: new Date(),
        },
        sellerId: 'sellerId',
        thumbnail: 'srcr',
        propertyType: 'beauty-center',
        isOpen: false,
      },
      {
        id: 'testid',
        city: 'new york',
        openTime: {
          from: new Date(),
          to: new Date(),
        },
        sellerId: 'sellerId',
        thumbnail: 'srcr',
        propertyType: 'vehicle',
        isOpen: false,
      },
      {
        id: 'testid',
        city: 'new york',
        openTime: {
          from: new Date(),
          to: new Date(),
        },
        sellerId: 'sellerId',
        thumbnail: 'src',
        propertyType: 'shop',
        isOpen: false,
      },
    ] as Localization[]);
  });

  it('should get places', async () => {
    const mockSearchData = [
      {
        dbId: '1',
        type: 'hotel',
      },
      {
        dbId: '3',
        type: 'hotel',
      },
    ];

    mockElasticGetPropertiesIdsByTypeQuery.mockReturnValue(mockSearchData);

    const mockfilteredData = mockSearchData.reduce((acc, curr) => {
      const typeAcc = Array.isArray(acc[curr.type]) ? [...acc[curr.type]] : [];
      return { ...acc, [curr.type]: [...typeAcc, curr.dbId] };
    }, {} as Record<string, string[]>);

    mockKafkaSend.mockImplementation(
      (
        pattern,
        input: GetServicesOpenTimeDataMessage | GetShopOpenTimeMessage,
      ) => ({
        subscribe:
          pattern ===
          KAFKA_MESSAGES.SERVICES_MESSAGES.getServiceOpenTimeData('shop')
            ? mockKafkaSubscribe.mockImplementation(
                (fn: (data: GetShopOpenTimeMessageReply) => any) => {
                  fn({
                    results: {
                      data: {
                        shops: [
                          {
                            id: 'testid',
                            location: {
                              city: 'new york',
                            },
                            openTime: {
                              from: new Date(),
                              to: new Date(),
                            },
                            sellerId: 'sellerId',
                            thumbnail: 'src',
                          },
                        ],
                      },
                      error: null,
                      success: true,
                    },
                  });
                },
              )
            : mockKafkaSubscribe.mockImplementation(
                (fn: (data: GetServicesOpenTimeDataMessageReply) => any) => {
                  fn({
                    results: {
                      data: {
                        services: [
                          {
                            id: 'testid',
                            location: {
                              city: 'new york',
                            },
                            openTime: {
                              from: new Date(),
                              to: new Date(),
                            },
                            sellerId: 'sellerId',
                            thumbnail: 'srcr',
                            type:
                              input instanceof GetServicesOpenTimeDataMessage
                                ? input.input.services.at(0).type
                                : 'shop',
                          },
                        ],
                      },
                      error: null,
                      success: true,
                    },
                  });
                },
              ),
      }),
    );

    const data = await resolver.getPlaces('hotel', mockedUser, 'en', undefined);

    expect(mockElasticGetPropertiesIdsByTypeQuery).toBeCalledTimes(1);
    expect(mockElasticGetPropertiesIdsByTypeQuery).toBeCalledWith('hotel');

    expect(mockKafkaSend).toBeCalledTimes(7);

    Object.entries(mockfilteredData).forEach(([key, value], idx) => {
      expect(mockKafkaSend.mock.calls[idx]).toMatchObject([
        KAFKA_MESSAGES.SERVICES_MESSAGES.getServiceOpenTimeData(key),
        key === 'shop'
          ? new GetShopOpenTimeMessage({ ids: value })
          : new GetServicesOpenTimeDataMessage({
              services: value.map((v) => ({ id: v, type: key })),
            }),
      ]);
    });

    expect(data).toStrictEqual([
      {
        id: 'testid',
        city: 'new york',
        openTime: {
          from: new Date(),
          to: new Date(),
        },
        sellerId: 'sellerId',
        thumbnail: 'srcr',
        propertyType: 'hotel',
        isOpen: false,
      },
      {
        id: 'testid',
        city: 'new york',
        openTime: {
          from: new Date(),
          to: new Date(),
        },
        sellerId: 'sellerId',
        thumbnail: 'srcr',
        propertyType: 'holiday-rentals',
        isOpen: false,
      },
      {
        id: 'testid',
        city: 'new york',
        openTime: {
          from: new Date(),
          to: new Date(),
        },
        sellerId: 'sellerId',
        thumbnail: 'srcr',
        propertyType: 'restaurant',
        isOpen: false,
      },
      {
        id: 'testid',
        city: 'new york',
        openTime: {
          from: new Date(),
          to: new Date(),
        },
        sellerId: 'sellerId',
        thumbnail: 'srcr',
        propertyType: 'health-center',
        isOpen: false,
      },
      {
        id: 'testid',
        city: 'new york',
        openTime: {
          from: new Date(),
          to: new Date(),
        },
        sellerId: 'sellerId',
        thumbnail: 'srcr',
        propertyType: 'beauty-center',
        isOpen: false,
      },
      {
        id: 'testid',
        city: 'new york',
        openTime: {
          from: new Date(),
          to: new Date(),
        },
        sellerId: 'sellerId',
        thumbnail: 'srcr',
        propertyType: 'vehicle',
        isOpen: false,
      },
      {
        id: 'testid',
        city: 'new york',
        openTime: {
          from: new Date(),
          to: new Date(),
        },
        sellerId: 'sellerId',
        thumbnail: 'src',
        propertyType: 'shop',
        isOpen: false,
      },
    ] as Localization[]);
  });
});
