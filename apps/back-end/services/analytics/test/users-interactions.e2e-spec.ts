import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import {
  ContentTypeEnum,
  USER_INTERACTION_SCORE,
} from '../src/users-interactions/const';
import { Kafka } from 'kafkajs';
import { ContentReactedEvent } from 'nest-dto';
import { ObjectId } from 'mongodb';
import {
  KafkaCustomTransport,
  KAFKA_BROKERS,
  KAFKA_EVENTS,
  mockedUser,
  secendMockedUser,
  waitFor,
} from 'nest-utils';
import { AppModule } from '../src/app.module';
import { PrismaClient } from '@prisma-client';
import { UsersInteractionsRepository } from '@users-interations/repository';

describe('users interfactiond e2e tests', () => {
  let app: INestApplication;

  let repo: UsersInteractionsRepository;

  let kafka = new Kafka({
    brokers: KAFKA_BROKERS,
    clientId: 'test clientId',
  });

  let producer = kafka.producer();

  beforeAll(async () => {
    producer.connect();
    const modulefixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    repo = modulefixture.get(UsersInteractionsRepository);

    app = modulefixture.createNestApplication();

    app.connectMicroservice<MicroserviceOptions>({
      strategy: new KafkaCustomTransport({
        client: {
          brokers: KAFKA_BROKERS,
          clientId: 'test clientId',
        },
        consumer: {
          groupId: 'test group id',
        },
      }),
    });

    await app.startAllMicroservices();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
    await producer.disconnect();
  });

  it('should handle reactions', async () => {
    let userId = mockedUser.id;
    let contentAuthorId = secendMockedUser.id;

    for (const type in ContentTypeEnum) {
      await producer.send({
        topic: KAFKA_EVENTS.REACTION_EVENTS.contentReacted(type, false),
        messages: [
          {
            value: new ContentReactedEvent({
              contentType: type,
              reacterUserId: userId,
              contentAuthorUserId: contentAuthorId,
              contentAuthorProfileId: new ObjectId().toHexString(),
              contentId: new ObjectId().toHexString(),
              reacterProfileId: new ObjectId().toHexString(),
              contentTitle: 'test title',
            }).toString(),
          },
        ],
      });
    }

    await waitFor(async () => {
      const interactionRecord = await repo.getOneByUserId(
        userId,
        contentAuthorId,
      );

      const {
        commentLike,
        commentReply,
        mention,
        message,
        postComment,
        postLike,
        share,
      } = USER_INTERACTION_SCORE;

      expect(interactionRecord).toStrictEqual({
        shares: 1,
        commentsReply: 2,
        commentsLikes: 1,
        messages: 1,
        mentions: 1,
        postLikes: 1,
        interactionScore:
          commentLike + share + commentReply * 2 + message + mention + postLike,
      });
    });
  });
});
