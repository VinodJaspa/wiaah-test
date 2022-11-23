import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import {
  AuthorizationDecodedUser,
  KAFKA_BROKERS,
  KAFKA_EVENTS,
  mockedUser,
  requestGraphql,
  SERVICES,
  waitFor,
} from 'nest-utils';
import { ObjectId } from 'mongodb';
import { Kafka } from 'kafkajs';
import { NewProductCreatedEvent } from 'nest-dto';
import { AppModule } from '../src/app.module';
import { PrismaClient } from 'prismaClient';

describe('product-post e2e tests', () => {
  let app: INestApplication;
  let prisma = new PrismaClient();
  let kafka = new Kafka({
    brokers: KAFKA_BROKERS,
    clientId: SERVICES.SOCIAL_SERVICE.clientId,
  });

  let producer = kafka.producer();

  beforeAll(async () => {
    await producer.connect();
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: KAFKA_BROKERS,
          clientId: SERVICES.SOCIAL_SERVICE.clientId,
        },
        consumer: {
          groupId: SERVICES.SOCIAL_SERVICE.groupId,
        },
      },
    });
    await app.startAllMicroservices();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
    await producer.disconnect();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  const publishProductCreated = (id: string, ownerId: string, shopId: string) =>
    producer.send({
      topic: KAFKA_EVENTS.PRODUCTS_EVENTS.productCreated,
      messages: [
        {
          value: new NewProductCreatedEvent({
            id,
            ownerId,
            shopId,
          }).toString(),
        },
      ],
    });

  const getUserProductsPosts = (userId: string, take: number, page: number) => {
    const getUserProductPostsQuery = `
    query get(
      $authorId:ID!
      $pagination:GqlPaginationInput!
    ){
      getUserProductPosts(
        args:{
          authorId:$authorId
          pagination:$pagination
        }
      ){
        id
        userId
        productId
      }
    }`;

    return reqGql(
      getUserProductPostsQuery,
      { authorId: userId, pagination: { take, page } },
      mockedUser,
    );
  };

  it('should create product shop post on product creation event', async () => {
    let productId = new ObjectId().toHexString();
    let productOwnerId = mockedUser.id;
    let productShopId = mockedUser.shopId;

    await publishProductCreated(productId, productOwnerId, productShopId);

    await waitFor(async () => {
      const res = await prisma.productPost.findMany();
      expect(res.length).toBe(1);
      expect(res.at(0)).toMatchObject({
        productId,
        userId: productOwnerId,
      });
    });

    const res = await getUserProductsPosts(productOwnerId, 10, 1);

    expect(res.body.errors).not.toBeDefined();
    const resPosts = res.body.data.getUserProductPosts;
    expect(resPosts).toHaveLength(1);
    expect(resPosts.at(0)).toMatchObject({
      userId: productOwnerId,
      productId: productId,
    });
  });

  it('should work with pagination', async () => {
    const arr = [...Array(20)];
    for (const e of arr) {
      await publishProductCreated(
        new ObjectId().toHexString(),
        mockedUser.id,
        mockedUser.shopId,
      );
    }

    await waitFor(async () => {
      const posts = await prisma.productPost.findMany();
      expect(posts).toHaveLength(20);
    });

    const res = await getUserProductsPosts(mockedUser.id, 5, 1);

    expect(res.body.errors).not.toBeDefined();
    expect(res.body.data.getUserProductPosts).toHaveLength(5);
  });
});
