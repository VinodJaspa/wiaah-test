import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { Kafka } from 'kafkajs';
import { ObjectId } from 'mongodb';
import { AffiliationCreatedEvent } from 'nest-dto';
import {
  AuthorizationDecodedUser,
  KAFKA_BROKERS,
  KAFKA_EVENTS,
  mockedUser,
  requestGraphql,
  SERVICES,
  waitFor,
} from 'nest-utils';
import { PrismaClient } from 'prismaClient';
import { AppModule } from '../src/app.module';

describe('affiliation-post e2e tests', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();
  const kafka = new Kafka({
    brokers: KAFKA_BROKERS,
    clientId: SERVICES.SOCIAL_SERVICE.clientId,
  });

  const producer = kafka.producer();

  beforeAll(async () => {
    await producer.connect();
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
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

  const publishAffiliation = (
    id: string,
    type: string,
    itemId: string,
    itemOwnerId: string,
  ) =>
    producer.send({
      topic: KAFKA_EVENTS.AFFILIATION.affiliationEntryCreated,
      messages: [
        {
          value: new AffiliationCreatedEvent({
            affiliationId: id,
            affiliatedItemType: type,
            itemId: itemId,
            itemOwnerId,
          }).toString(),
        },
      ],
    });

  const getUserAffiliationPosts = (
    userId: string,
    take: number,
    page: number,
    user: AuthorizationDecodedUser,
  ) => {
    const query = `
    query get(
      $userId:ID!
      $pagination:GqlPaginationInput!
    ){
      getAuthorAffiliationPosts(
        args:{
          userId:$userId
          pagination:$pagination
        }
      ){
        id
        userId
        affiliationId
      }
    }`;

    return reqGql(query, { userId, pagination: { take, page } }, user);
  };

  it('should create affiliation post on affiliation created event', async () => {
    const affiliationId = new ObjectId().toHexString();
    const itemId = new ObjectId().toHexString();
    const itemOwnerId = new ObjectId().toHexString();

    await publishAffiliation(affiliationId, 'service', itemId, itemOwnerId);

    await waitFor(async () => {
      const posts = await prisma.affiliationPost.findMany();

      expect(posts).toHaveLength(1);
      expect(posts.at(0)).toMatchObject({
        affiliationId,
        userId: itemOwnerId,
      });
    });
  });

  it('should work with pagination', async () => {
    const affiliationId = new ObjectId().toHexString();
    const itemId = new ObjectId().toHexString();
    const itemOwnerId = new ObjectId().toHexString();
    const arr = [...Array(20)];
    for (const e of arr) {
      await publishAffiliation(affiliationId, 'product', itemId, itemOwnerId);
    }

    await waitFor(async () => {
      const posts = await prisma.affiliationPost.findMany();
      expect(posts).toHaveLength(20);
    });

    const res = await getUserAffiliationPosts(itemOwnerId, 5, 1, {
      ...mockedUser,
      id: itemOwnerId,
    });

    expect(res.body.errors).not.toBeDefined();
    expect(res.body.data.getAuthorAffiliationPosts).toHaveLength(5);
  });
});
