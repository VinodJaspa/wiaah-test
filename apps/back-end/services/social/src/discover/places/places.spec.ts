import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  AuthorizationDecodedUser,
  mockedUser,
  NestKafkaClientMock,
  requestGraphql,
  secendMockedUser,
  SERVICES,
} from 'nest-utils';
import { AppModule } from '../app.module';
import { KafkaMessageHandler } from 'nest-utils';
import {
  GetBulkUserMostInteractionersMessageReply,
  GetBulkUsersPaidBookingMessageReply,
  GetFilteredServicesMessageReply,
  GetUserMostInteractionersMessageReply,
  GetUserPaidBookingMessageReply,
} from 'nest-dto';

jest.mock('nest-utils', () => ({
  //@ts-ignore
  ...jest.requireActual('nest-utils'),
  KafkaMessageHandler: jest.fn(),
}));

describe('places tests', () => {
  let app: INestApplication;

  const mockKafka = new NestKafkaClientMock();
  const mockKafkaMessageHandler = KafkaMessageHandler as jest.Mock;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SERVICES.DISCOVER.token)
      .useValue(mockKafka)
      .compile();

    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  const getPlacesQuery = `
  query {
    getPlaceSuggestions {
        places {
            id
            type
        }
    }
  }`;

  it('should get places', async () => {
    const interaction1 = '1';
    const interaction2 = '2';
    const interaction3 = '3';
    const interaction4 = '4';
    const service1 = '1';
    const service2 = '2';
    const service3 = '3';
    const service4 = '4';
    const service5 = '5';
    const service6 = '6';
    const service7 = '7';

    mockKafkaMessageHandler.mockReturnValueOnce(
      new GetUserMostInteractionersMessageReply({
        data: {
          users: [
            { id: interaction1, score: 15 },
            { id: interaction2, score: 34 },
            { id: interaction3, score: 6 },
          ],
        },
        error: null,
        success: true,
      }),
    );

    mockKafkaMessageHandler.mockReturnValueOnce(
      new GetUserPaidBookingMessageReply({
        data: {
          bookings: [
            {
              serviceId: service1,
              userId: mockedUser.id,
            },
            { serviceId: service2, userId: mockedUser.id },
          ],
        },
        error: null,
        success: true,
      }),
    );

    mockKafkaMessageHandler.mockReturnValueOnce(
      new GetBulkUsersPaidBookingMessageReply({
        data: {
          users: [
            {
              id: interaction1,
              bookings: [
                {
                  serviceId: service1,
                  userId: interaction1,
                },
                { serviceId: service2, userId: interaction1 },
              ],
            },
            {
              id: interaction2,
              bookings: [
                {
                  serviceId: service2,
                  userId: interaction2,
                },
              ],
            },
            {
              id: interaction3,
              bookings: [
                {
                  serviceId: service3,
                  userId: interaction3,
                },
              ],
            },
          ],
        },
        error: null,
        success: true,
      }),
    );

    mockKafkaMessageHandler.mockReturnValueOnce(
      new GetFilteredServicesMessageReply({
        data: {
          services: [
            {
              id: service1,
              location: {
                city: mockedUser.city,
                country: mockedUser.country,
                lat: 65,
                lon: 48,
                distance: 40,
              },
              rate: 4.5,
              type: 'hotel',
              userId: '',
            },
            {
              id: service2,
              location: {
                city: secendMockedUser.city,
                country: secendMockedUser.country,
                lat: 65,
                lon: 48,
                distance: 5,
              },
              rate: 4.8,
              type: 'hotel',
              userId: '',
            },
            {
              id: service3,
              location: {
                city: secendMockedUser.city,
                country: secendMockedUser.country,
                lat: 65,
                lon: 48,
                distance: 70,
              },
              rate: 4.5,
              type: 'hotel',
              userId: '',
            },
          ],
        },
        error: null,
        success: true,
      }),
    );

    const res = await reqGql(getPlacesQuery, {}, mockedUser);

    expect(res.body.errors).not.toBeDefined();
    expect(res.body.data.getPlaceSuggestions.places).toHaveLength(3);

    expect(res.body.data.getPlaceSuggestions.places.at(0).id).toBe(service2);
    expect(res.body.data.getPlaceSuggestions.places.at(1).id).toBe(service1);
    expect(res.body.data.getPlaceSuggestions.places.at(2).id).toBe(service3);
  });
});
