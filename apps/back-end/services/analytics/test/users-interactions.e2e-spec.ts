import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import {
  ContentTypeEnum,
  USER_INTERACTION_SCORE,
} from '../src/users-interactions/const';
import { Kafka } from 'kafkajs';
import {
  ChatPrivateMessageSentEvent,
  CommentCreatedEvent,
  ContentReactedEvent,
  ContentSharedEvent,
  PostSavedEvent,
  ProfileVisitedEvent,
  UserMentionEvent,
} from 'nest-dto';
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
import { UsersInteractionsRepository } from '@users-interations/repository';
import { PrismaClient } from '@prisma-client';

describe('users interactions e2e tests', () => {
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
          allowAutoTopicCreation: true,
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
              // contentAuthorProfileId: new ObjectId().toHexString(),
              contentId: new ObjectId().toHexString(),
              // reacterProfileId: new ObjectId().toHexString(),
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

      const { commentLike, postLike } = USER_INTERACTION_SCORE;

      expect(interactionRecord).toMatchObject({
        shares: 0,
        commentsReply: 0,
        commentsLikes: 1,
        messages: 0,
        mentions: 0,
        postLikes: 1,
        interactionScore: commentLike + postLike,
      });
    });
  });

  it('should handle comments', async () => {
    let userId = mockedUser.id;
    let contentAuthorId = secendMockedUser.id;

    await producer.send({
      topic: KAFKA_EVENTS.COMMENTS_EVENTS.commentCreated('comment'),
      messages: [
        {
          value: new CommentCreatedEvent({
            commentedAt: new Date().toString(),
            commentedByProfileId: new ObjectId().toHexString(),
            commentedByUserId: userId,
            commentId: new ObjectId().toHexString(),
            contentOwnerUserId: contentAuthorId,
            hostAuthorId: contentAuthorId,
            hostId: new ObjectId().toHexString(),
            hostType: 'comment',
            mainHostAuthorId: new ObjectId().toHexString(),
            mainHostId: new ObjectId().toHexString(),
          }).toString(),
        },
      ],
    });

    await waitFor(async () => {
      const interactionRecord = await repo.getOneByUserId(
        userId,
        contentAuthorId,
      );

      const { commentReply } = USER_INTERACTION_SCORE;

      expect(interactionRecord).toMatchObject({
        shares: 0,
        commentsReply: 1,
        commentsLikes: 0,
        messages: 0,
        mentions: 0,
        postLikes: 0,
        interactionScore: commentReply,
      });
    });
  });

  it('should handle shares', async () => {
    let userId = mockedUser.id;
    let contentAuthorId = secendMockedUser.id;

    await producer.send({
      topic: KAFKA_EVENTS.SHARES_EVENTS.contentShared('post', false),
      messages: [
        {
          value: new ContentSharedEvent({
            contentAuthorUserId: contentAuthorId,
            contentId: new ObjectId().toHexString(),
            contentType: 'post',
            sharedAt: new Date().toString(),
            sharedByProfileId: new ObjectId().toHexString(),
            sharedByUserId: userId,
          }).toString(),
        },
      ],
    });

    await waitFor(async () => {
      const interactionRecord = await repo.getOneByUserId(
        userId,
        contentAuthorId,
      );

      const { share } = USER_INTERACTION_SCORE;

      expect(interactionRecord).toMatchObject({
        shares: 1,
        commentsReply: 0,
        commentsLikes: 0,
        messages: 0,
        mentions: 0,
        postLikes: 0,
        interactionScore: share,
      });
    });
  });

  it('should handle messages', async () => {
    let userId = mockedUser.id;
    let contentAuthorId = secendMockedUser.id;

    await producer.send({
      topic: KAFKA_EVENTS.CHAT.privateMessageSent,
      messages: [
        {
          value: new ChatPrivateMessageSentEvent({
            messageId: new ObjectId().toHexString(),
            sentById: userId,
            sentToId: contentAuthorId,
          }).toString(),
        },
      ],
    });

    await waitFor(async () => {
      const interactionRecord = await repo.getOneByUserId(
        userId,
        contentAuthorId,
      );

      const { message } = USER_INTERACTION_SCORE;

      expect(interactionRecord).toMatchObject({
        shares: 0,
        commentsReply: 0,
        commentsLikes: 0,
        messages: 1,
        mentions: 0,
        postLikes: 0,
        interactionScore: message,
      });
    });
  });

  it('should handle mentions', async () => {
    let userId = mockedUser.id;
    let contentAuthorId = secendMockedUser.id;

    await producer.send({
      topic: KAFKA_EVENTS.SOCIAL_EVENTS.userMention('', false),
      messages: [
        {
          value: new UserMentionEvent({
            hostId: new ObjectId().toHexString(),
            hostType: 'post',
            mentionedId: contentAuthorId,
            userId,
          }).toString(),
        },
      ],
    });

    await waitFor(async () => {
      const interactionRecord = await repo.getOneByUserId(
        userId,
        contentAuthorId,
      );

      const { mention } = USER_INTERACTION_SCORE;

      expect(interactionRecord).toMatchObject({
        shares: 0,
        commentsReply: 0,
        commentsLikes: 0,
        messages: 0,
        mentions: 1,
        postLikes: 0,
        interactionScore: mention,
      });
    });
  });

  it('should handle profile visits', async () => {
    let userId = mockedUser.id;
    let contentAuthorId = secendMockedUser.id;

    await producer.send({
      topic: KAFKA_EVENTS.PROFILE_EVENTS.profileVisited('', false),
      messages: [
        {
          value: new ProfileVisitedEvent({
            profileAuthorId: contentAuthorId,
            profileId: new ObjectId().toHexString(),
            visitorId: userId,
          }).toString(),
        },
      ],
    });

    await waitFor(async () => {
      const interactionRecord = await repo.getOneByUserId(
        userId,
        contentAuthorId,
      );

      const { profileVisit } = USER_INTERACTION_SCORE;

      expect(interactionRecord).toMatchObject({
        shares: 0,
        commentsReply: 0,
        commentsLikes: 0,
        messages: 0,
        mentions: 0,
        postLikes: 0,
        profileVisits: 1,
        interactionScore: profileVisit,
      });
    });
  });

  it('should handle saved posts', async () => {
    let userId = mockedUser.id;
    let contentAuthorId = secendMockedUser.id;

    await producer.send({
      topic: KAFKA_EVENTS.SOCIAL_EVENTS.postSaved('', false),
      messages: [
        {
          value: new PostSavedEvent({
            postAuthorId: contentAuthorId,
            postId: new ObjectId().toHexString(),
            saverId: userId,
          }).toString(),
        },
      ],
    });

    await waitFor(async () => {
      const interactionRecord = await repo.getOneByUserId(
        userId,
        contentAuthorId,
      );

      const { postSave } = USER_INTERACTION_SCORE;

      expect(interactionRecord).toMatchObject({
        shares: 0,
        commentsReply: 0,
        commentsLikes: 0,
        messages: 0,
        mentions: 0,
        postLikes: 0,
        profileVisits: 0,
        postSaved: 1,
        interactionScore: postSave,
      });
    });
  });
});
