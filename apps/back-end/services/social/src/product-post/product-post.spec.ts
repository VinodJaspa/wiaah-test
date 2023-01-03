import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import {
  AuthorizationDecodedUser,
  getUserFromRequest,
  KafkaMessageHandler,
  mockedUser,
  requestGraphql,
} from 'nest-utils';
import {
  GetBulkUsersPaidProductsMessageReply,
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
import { kafkaModule } from '@kafkaModule';
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
    let interactioner1 = new ObjectId().toHexString();
    let interactioner2 = new ObjectId().toHexString();
    let interactioner3 = new ObjectId().toHexString();
    let interactioner4 = new ObjectId().toHexString();
    let product1 = new ObjectId().toHexString();
    let product2 = new ObjectId().toHexString();
    let product3 = new ObjectId().toHexString();
    let product4 = new ObjectId().toHexString();

    await prisma.productPost.create({
      data: {
        productId: product1,
        userId: interactioner1,
        reactionNum: 150,
        comments: 5,
        shares: 15,
      },
    });

    await prisma.productPost.create({
      data: {
        productId: product2,
        userId: interactioner2,
        reactionNum: 350,
        comments: 15,
        shares: 50,
      },
    });

    await prisma.productPost.create({
      data: {
        productId: product3,
        userId: interactioner3,
      },
    });

    await prisma.productPost.create({
      data: {
        productId: product4,
        userId: interactioner4,
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

    let res = await reqGql(getShopProductsSuggestionsQuery, {}, mockedUser);

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
