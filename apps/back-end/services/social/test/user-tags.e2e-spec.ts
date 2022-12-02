import { CreatePostInput } from '@input';
import { Controller, INestApplication, Injectable } from '@nestjs/common';
import {
  EventPattern,
  MicroserviceOptions,
  Payload,
} from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { UserTaggedEvent } from 'nest-dto';
import {
  AuthorizationDecodedUser,
  KafkaCustomTransport,
  KAFKA_BROKERS,
  KAFKA_EVENTS,
  mockedUser,
  NestKafkaClientMock,
  requestGraphql,
  SERVICES,
  waitFor,
} from 'nest-utils';
import { PostType, PrismaClient } from 'prismaClient';
import { AppModule } from '../src/app.module';

describe('user tags e2e tests', () => {
  let app: INestApplication;
  let mockKafka = new NestKafkaClientMock();
  beforeAll(async () => {
    const modulefixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SERVICES.SOCIAL_SERVICE.token)
      .useValue(mockKafka)
      .compile();

    app = modulefixture.createNestApplication();
    app.connectMicroservice<MicroserviceOptions>({
      strategy: new KafkaCustomTransport({
        client: { brokers: KAFKA_BROKERS, clientId: 'client id' },
        consumer: {
          groupId: 'test-consumer',
        },
      }),
    });
    await app.startAllMicroservices();
    await app.init();
  });

  beforeEach(async () => {
    mockKafka.reset();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  it('should publish kafka events of the post tagged users ', async () => {
    const client = new PrismaClient();

    await client.profile.create({
      data: {
        lastActive: new Date(),
        ownerId: mockedUser.id,
        photo: 'test',
        profession: 'test',
        username: 'test',
      },
    });
    let query = `
    mutation post(
      $title:String!
      $content:String!
      $attachments:[AttachmentInput!]!
      $hashtags:[HashtagInput!]!
      $tags:[PostTagInput!]!
      
    ){
      createNewsfeedPost(
        createNewsfeedPostInput:{
          title:$title
          content:$content
          attachments:$attachments
          hashtags:$hashtags
          tags:$tags
        }
      ){
        id
      }
    }
    `;

    let input: CreatePostInput = {
      title: 'test',
      attachments: [{ src: 'test src', type: 'img' }],
      content: 'content',
      hashtags: [{ tag: 'tag' }],
      tags: [{ userId: 'test userId' }],
    };

    let res = await reqGql(query, input, mockedUser);

    expect(res.body.errors).not.toBeDefined();

    await waitFor(async () => {
      const posts = await client.newsfeedPost.findMany();
      expect(posts).toHaveLength(1);
      expect(mockKafka.emit).toBeCalledTimes(2);
      expect(mockKafka.emit).toBeCalledWith(
        KAFKA_EVENTS.SOCIAL_EVENTS.userTag(PostType.newsfeed_post),
        new UserTaggedEvent({
          userId: 'test userId',
          contentAuthorId: mockedUser.id,
          contentId: posts.at(0).id,
          contentType: PostType.newsfeed_post,
        }),
      );
    });
  });
});
