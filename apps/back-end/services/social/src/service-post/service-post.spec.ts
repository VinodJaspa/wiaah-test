import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  AuthorizationDecodedUser,
  getUserFromRequest,
  KafkaMessageHandler,
  mockedUser,
  requestGraphql,
} from 'nest-utils';
import {
  GetBulkUsersPaidBookingMessageReply,
  GetFilteredServicesMessageReply,
  GetUserInterestsScoresMessageReply,
  GetUserMostInteractionersMessageReply,
  GetUserPaidBookingMessageReply,
} from 'nest-dto';
import { PrismaClient } from 'prismaClient';
import { ObjectId } from 'mongodb';
import { ServicePostModule } from './service-post.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver } from '@nestjs/apollo';
import { PrismaModule } from '@prisma-module';
import { CqrsModule } from '@nestjs/cqrs';

jest.mock('nest-utils', () => ({
  //@ts-ignore
  ...jest.requireActual('nest-utils'),
  KafkaMessageHandler: jest.fn(),
}));

describe('product-post tests', () => {
  let app: INestApplication;
  let mockMessageHandler = KafkaMessageHandler as jest.Mock;

  let prisma = new PrismaClient();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        CqrsModule,
        ServicePostModule,
        GraphQLModule.forRoot({
          driver: ApolloFederationDriver,
          context: (ctx: any) => ({
            ...ctx,
            user: getUserFromRequest(ctx.req),
          }),
          autoSchemaFile: true,
        }),
        PrismaModule,
      ],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  const getServicesPostsSuggestionsQuery = `
    query get($take:Int!, $page:Int!){
        getRecommendedServicePosts(
            pagination:{
                take:$take
                page:$page
            }
        ) {
            id
            userId
            serviceId
        }
    }
    `;

  it('should get product post suggestion correctly', async () => {
    let interactioner1 = new ObjectId().toHexString();
    let interactioner2 = new ObjectId().toHexString();
    let interactioner3 = new ObjectId().toHexString();
    let interactioner4 = new ObjectId().toHexString();
    let service1 = new ObjectId().toHexString();
    let service2 = new ObjectId().toHexString();
    let service3 = new ObjectId().toHexString();
    let service4 = new ObjectId().toHexString();

    await prisma.servicePost.create({
      data: {
        serviceId: service1,
        userId: interactioner1,
        reactionNum: 150,
        comments: 5,
        shares: 15,
        visibility: 'public',
      },
    });

    await prisma.servicePost.create({
      data: {
        serviceId: service2,
        userId: interactioner2,
        reactionNum: 350,
        comments: 15,
        shares: 50,
        visibility: 'public',
      },
    });

    await prisma.servicePost.create({
      data: {
        serviceId: service3,
        userId: interactioner3,
        visibility: 'public',
      },
    });

    await prisma.servicePost.create({
      data: {
        serviceId: service4,
        userId: interactioner4,
        visibility: 'public',
      },
    });

    mockMessageHandler.mockReturnValueOnce(
      new GetUserMostInteractionersMessageReply({
        data: {
          users: [
            { id: interactioner1, score: 15 },
            { id: interactioner2, score: 50 },
          ],
        },
        error: null,
        success: true,
      }),
    );

    mockMessageHandler.mockReturnValueOnce(
      new GetUserPaidBookingMessageReply({
        data: {
          bookings: [{ serviceId: service1, userId: mockedUser.id }],
        },
        error: null,
        success: true,
      }),
    );

    mockMessageHandler.mockReturnValueOnce(
      new GetUserInterestsScoresMessageReply({
        data: {
          keywords: [
            { score: 15, value: 'test' },
            { score: 30, value: 'test2' },
          ],
          userId: mockedUser.id,
        },
        error: null,
        success: true,
      }),
    );

    mockMessageHandler.mockReturnValueOnce(
      new GetBulkUsersPaidBookingMessageReply({
        data: {
          users: [
            {
              id: interactioner1,
              bookings: [{ serviceId: service1, userId: interactioner1 }],
            },
            {
              id: interactioner2,
              bookings: [{ userId: interactioner2, serviceId: service2 }],
            },
          ],
        },
        error: null,
        success: true,
      }),
    );

    mockMessageHandler.mockReturnValueOnce(
      new GetFilteredServicesMessageReply({
        data: {
          services: [
            {
              id: service1,
              distence: 60,
              keywords: ['test', 'test2'],
              rate: 3.2,
              sales: 4,
              type: 'hotel',
              userId: interactioner1,
            },
            {
              id: service2,
              distence: 20,
              keywords: ['test1'],
              rate: 4.2,
              sales: 8,
              type: 'restaurant',
              userId: interactioner2,
            },
            {
              id: service3,
              distence: 30,
              keywords: ['test1'],
              rate: 3.2,
              sales: 4,
              type: 'health-center',
              userId: interactioner3,
            },
            {
              id: service4,
              distence: 80,
              keywords: ['test, test2'],
              rate: 3.2,
              sales: 4,
              type: 'beauty-center',
              userId: interactioner4,
            },
          ],
        },
        error: null,
        success: true,
      }),
    );

    let res = await reqGql(
      getServicesPostsSuggestionsQuery,
      {
        page: 1,
        take: 50,
      },
      mockedUser,
    );

    expect(res.body.errors).not.toBeDefined();

    expect(res.body.data.getRecommendedServicePosts).toHaveLength(4);
    expect(res.body.data.getRecommendedServicePosts.at(0).serviceId).toBe(
      service2,
    );
    expect(res.body.data.getRecommendedServicePosts.at(1).serviceId).toBe(
      service1,
    );
  });
});
