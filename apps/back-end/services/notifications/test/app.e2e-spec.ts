import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  KAFKA_BROKERS,
  KAFKA_EVENTS,
  mockedUser,
  requestGraphql,
  secendMockedUser,
  thirdMockedUser,
  waitFor,
} from 'nest-utils';
import { Kafka } from 'kafkajs';

import { AppModule } from './../src/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationPaginationResponse } from '@entities';
import {
  CommentCreatedEvent,
  CommentMentionedEvent,
  ContentReactedEvent,
} from 'nest-dto';
import { PrismaService } from 'prismaService';

jest.setTimeout(10000);

describe('root (e2e)', () => {
  let app: INestApplication;
  let kafkaClientId = 'test-client';
  let kafka = new Kafka({
    brokers: KAFKA_BROKERS,
    clientId: kafkaClientId,
  });
  let prisma: PrismaService;
  let producer = kafka.producer();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: KAFKA_BROKERS,
        },
      },
    });

    app.enableShutdownHooks();
    prisma = moduleFixture.get(PrismaService);
    await app.init();
    await app.startAllMicroservices();
    await producer.connect();
  });
  beforeEach(async () => {
    const notifications = await getMyNotifications();
    expect(notifications).toStrictEqual({
      data: [],
      total: 0,
      hasMore: false,
    });
  });

  const reqGraphql = (query: string, variables: Record<string, any>) =>
    requestGraphql(app, query, variables);

  async function getMyNotifications(
    user: AuthorizationDecodedUser = mockedUser,
  ): Promise<NotificationPaginationResponse> {
    const getMyNotifications = `
      query {
        getMyNotifications {
            data { 
            id 
            authorId
            userId
            createdAt
            updatedAt
            type
            author {
              id
            }
            authorProfileId
            content
          }
          total
          hasMore
        }
      }
    `;

    const res = await reqGraphql(getMyNotifications, {}).set({
      user: JSON.stringify(user),
    });
    expect(res.body.errors).not.toBeDefined();
    return res.body.data.getMyNotifications as NotificationPaginationResponse;
  }

  afterAll(async () => {
    if (app) {
      await app.close();
    }
    await producer.disconnect();
  });

  const emitContentCommentsEvent = () =>
    producer.send({
      topic: KAFKA_EVENTS.COMMENTS_EVENTS.commentCreated,
      messages: [
        {
          value: new CommentCreatedEvent({
            commentedAt: new Date().toISOString(),
            commentedByProfileId: mockedUser.shopId,
            commentedByUserId: secendMockedUser.id,
            commentId: secendMockedUser.shopId,
            hostId: thirdMockedUser.id,
            hostType: 'post',
            mainHostId: thirdMockedUser.shopId,
            contentOwnerUserId: mockedUser.id,
          }).toString(),
        },
      ],
    });
  const emitContentReactionEvent = () =>
    producer.send({
      topic: KAFKA_EVENTS.REACTION_EVENTS.contentReacted,
      messages: [
        {
          value: new ContentReactedEvent({
            contentTitle: 'test title',
            contentAuthorProfileId: mockedUser.shopId,
            contentAuthorUserId: mockedUser.id,
            contentId: thirdMockedUser.id,
            contentType: 'newsfeed-post',
            reacterProfileId: secendMockedUser.shopId,
            reacterUserId: secendMockedUser.id,
          }).toString(),
        },
      ],
    });

  const emitCommentMentationsEvent = () =>
    producer.send({
      topic: KAFKA_EVENTS.COMMENTS_EVENTS.commentMentions,
      messages: [
        {
          value: new CommentMentionedEvent({
            commentId: thirdMockedUser.id,
            mainHostId: thirdMockedUser.shopId,
            mentionedAt: new Date().toString(),
            mentionedByProfileId: secendMockedUser.shopId,
            mentionedByUserId: secendMockedUser.id,
            mentionedIds: [
              { profileId: mockedUser.shopId, userId: mockedUser.id },
            ],
          }).toString(),
        },
      ],
    });
  it('should get my content comments notifications', async () => {
    await emitContentCommentsEvent();
    await waitFor(async () => {
      const res = await prisma.notification.findMany();
      expect(res.length).toBe(1);
    });
    const myNotifications = await getMyNotifications();
    console.log(myNotifications);
    expect(myNotifications.data.length).toBe(1);
    expect(myNotifications.total).toBe(1);
    expect(myNotifications.hasMore).toBe(false);

    expect(myNotifications.data.at(0).authorId).toBe(secendMockedUser.id);
    expect(myNotifications.data.at(0).userId).toBe(mockedUser.id);
    expect(myNotifications.data.at(0).type === 'postCommented').toBe(true);
  });

  it('should get my content reaction notifications', async () => {
    await emitContentReactionEvent();
    await waitFor(async () => {
      const res = await prisma.notification.findMany();
      expect(res.length).toBe(1);
    });
    const myNotifications = await getMyNotifications();
    expect(myNotifications.data.length).toBe(1);
    expect(myNotifications.total).toBe(1);
    expect(myNotifications.hasMore).toBe(false);
    expect(myNotifications.data.at(0).authorId).toBe(secendMockedUser.id);
    expect(myNotifications.data.at(0).userId).toBe(mockedUser.id);
    expect(myNotifications.data.at(0).type === 'postReacted').toBe(true);
  });
  it('should get my mentions notifications', async () => {
    await emitCommentMentationsEvent();
    await waitFor(async () => {
      const res = await prisma.notification.findMany();
      expect(res.length).toBe(1);
    });
    const myNotifications = await getMyNotifications();
    expect(myNotifications.data.length).toBe(1);
    expect(myNotifications.total).toBe(1);
    expect(myNotifications.hasMore).toBe(false);
    expect(myNotifications.data.at(0).authorId).toBe(secendMockedUser.id);
    expect(myNotifications.data.at(0).userId).toBe(mockedUser.id);
    expect(myNotifications.data.at(0).type === 'commentMention').toBe(true);
  });
});
