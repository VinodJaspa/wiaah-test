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
  GetBulkUsersPaidProductsMessageReply,
  GetFilteredProductsMessageReply,
  GetUserInterestsScoresMessageReply,
  GetUserMostInteractionersMessageReply,
  GetUserPaidProductsMessageReply,
} from 'nest-dto';
import { PrismaClient } from 'prismaClient';
import { ObjectId } from 'mongodb';
import { ProductPostModule } from './product-post.module';
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
  const mockMessageHandler = KafkaMessageHandler as jest.Mock;

  const prisma = new PrismaClient();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        CqrsModule,
        ProductPostModule,
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

  const getShopProductsSuggestionsQuery = `
    query {
        getRecommendedProductPosts {
            id
            userId
            productId
        }
    }
    `;

  it('should get product post suggestion correctly', async () => {
    const interactioner1 = new ObjectId().toHexString();
    const interactioner2 = new ObjectId().toHexString();
    const interactioner3 = new ObjectId().toHexString();
    const interactioner4 = new ObjectId().toHexString();
    const product1 = new ObjectId().toHexString();
    const product2 = new ObjectId().toHexString();
    const product3 = new ObjectId().toHexString();
    const product4 = new ObjectId().toHexString();

    await prisma.productPost.create({
      data: {
        productId: product1,
        userId: interactioner1,
        reactionNum: 150,
        comments: 5,
        shares: 15,
        visibility: 'public',
      },
    });

    await prisma.productPost.create({
      data: {
        productId: product2,
        userId: interactioner2,
        reactionNum: 350,
        comments: 15,
        shares: 50,
        visibility: 'public',
      },
    });

    await prisma.productPost.create({
      data: {
        productId: product3,
        userId: interactioner3,
        visibility: 'public',
      },
    });

    await prisma.productPost.create({
      data: {
        productId: product4,
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
      new GetUserPaidProductsMessageReply({
        data: {
          id: mockedUser.id,
          products: [{ productId: product1, userId: mockedUser.id }],
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
      new GetBulkUsersPaidProductsMessageReply({
        data: {
          users: [
            {
              id: interactioner1,
              products: [{ productId: product1, userId: interactioner1 }],
            },
            {
              id: interactioner2,
              products: [{ userId: interactioner2, productId: product2 }],
            },
          ],
        },
        error: null,
        success: true,
      }),
    );

    mockMessageHandler.mockReturnValueOnce(
      new GetFilteredProductsMessageReply({
        data: {
          products: [
            {
              productId: product1,
              distence: 60,
              keywords: ['test', 'test2'],
              rate: 3.2,
              sales: 4,
            },
            {
              productId: product2,
              distence: 20,
              keywords: ['test1'],
              rate: 4.2,
              sales: 8,
            },
            {
              productId: product3,
              distence: 30,
              keywords: ['test1'],
              rate: 3.2,
              sales: 4,
            },
            {
              productId: product4,
              distence: 80,
              keywords: ['test, test2'],
              rate: 3.2,
              sales: 4,
            },
          ],
        },
        error: null,
        success: true,
      }),
    );

    const res = await reqGql(getShopProductsSuggestionsQuery, {}, mockedUser);

    expect(res.body.errors).not.toBeDefined();

    expect(res.body.data.getRecommendedProductPosts).toHaveLength(4);
    expect(res.body.data.getRecommendedProductPosts.at(0).productId).toBe(
      product2,
    );
    expect(res.body.data.getRecommendedProductPosts.at(1).productId).toBe(
      product1,
    );
  });
});
