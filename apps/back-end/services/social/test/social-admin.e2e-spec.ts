import { kafkaModule } from '@kafkaModule';
import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { PrismaModule } from '@prisma-module';
import {
  AuthorizationDecodedUser,
  KafkaCustomTransport,
  KAFKA_BROKERS,
  mockedUser,
  requestGraphql,
  SERVICES,
} from 'nest-utils';
import { PrismaClient } from 'prismaClient';
import { AppModule } from '../src/app.module';

describe('Social admin tests', () => {
  let app: INestApplication;
  let prisma = new PrismaClient();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, PrismaModule, kafkaModule],
    }).compile();

    app = module.createNestApplication();

    app.connectMicroservice<MicroserviceOptions>({
      strategy: new KafkaCustomTransport({
        client: {
          brokers: KAFKA_BROKERS,
          clientId: SERVICES.SOCIAL_SERVICE.clientId,
        },
        consumer: {
          groupId: SERVICES.SOCIAL_SERVICE.groupId,
        },
      }),
    });

    await app.startAllMicroservices();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  it('Should get user posts', async () => {
    await prisma.newsfeedPost.createMany({
      data: [...Array(5)].map((_, i) => ({
        authorProfileId: mockedUser.shopId,
        content: 'test' + i,
        title: 'title' + i,
        userId: mockedUser.id,
      })),
    });

    const getPostsQuery = `
    query getPosts(
        $userId:String!
        $pagination:GqlPaginationInput
    ){
        getProfileNewsfeedPosts(
            getUserNewsfeedPosts:{
                userId:$userId
                pagination:$pagination
            }
        ){
            id
        }
    }`;

    const res = await reqGql(
      getPostsQuery,
      {
        userId: mockedUser.id,
      },
      mockedUser,
    );

    expect(res.body.errors).not.toBeDefined();

    expect(res.body.data.getProfileNewsfeedPosts).toHaveLength(5);
  });
});
