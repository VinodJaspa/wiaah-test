import { Comment } from '@entities';
import { Controller, INestApplication } from '@nestjs/common';
import {
  MessagePattern,
  MicroserviceOptions,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { AppModule } from '@prisma-module';
import { ObjectId } from 'mongodb';
import {
  GetUsersActivityScoresMessage,
  GetUsersInteractionsByUserIdMessage,
} from 'nest-dto';
import {
  AuthorizationDecodedUser,
  KafkaCustomTransport,
  KAFKA_BROKERS,
  KAFKA_MESSAGES,
  mockedUser,
  requestGraphql,
} from 'nest-utils';
import { PrismaClient } from 'prismaClient';

let mockGetUsersInteractonsByUserId = jest.fn();
let mockGetUsersActivityScoresById = jest.fn();

@Controller()
class TestCommentsReplier {
  @MessagePattern(
    KAFKA_MESSAGES.ANALYTICS_MESSAGES.getUsersInteractionsByUserId(),
  )
  handleUsersInteractions(
    @Payload() { value }: { value: GetUsersInteractionsByUserIdMessage },
  ) {
    mockGetUsersInteractonsByUserId(value.input);
  }

  @MessagePattern(
    KAFKA_MESSAGES.ANALYTICS_MESSAGES.getUsersActivityScoresByIds(),
  )
  handleUsersActivity(
    @Payload() { value }: { value: GetUsersActivityScoresMessage },
  ) {
    mockGetUsersActivityScoresById(value.input);
  }
}

describe('comments e2e tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    let moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [TestCommentsReplier],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice<MicroserviceOptions>({
      strategy: new KafkaCustomTransport({
        client: {
          brokers: KAFKA_BROKERS,
          clientId: 'test client',
        },
      }),
    });
    await app.init();
    await app.startAllMicroservices();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  it('should get sorted comments based on friendship score and activity score', async () => {
    let prisma = new PrismaClient();
    let hostId = new ObjectId().toHexString();
    let mockUserId = mockedUser.id;

    let friendsComments = await Promise.all(
      [...Array(5)].map(() =>
        prisma.comment.create({
          data: {
            userId: new ObjectId().toHexString(),
            content: 'test',
            hostId,
            hostType: 'post_newsfeed',
            authorProfileId: new ObjectId().toHexString(),
          },
        }),
      ),
    );

    let activeUsersComments = await Promise.all(
      [...Array(5)].map(() =>
        prisma.comment.create({
          data: {
            userId: new ObjectId().toHexString(),
            content: 'test',
            hostId,
            hostType: 'post_newsfeed',
            authorProfileId: new ObjectId().toHexString(),
          },
        }),
      ),
    );

    let otherComments = await Promise.all(
      [...Array(5)].map(() =>
        prisma.comment.create({
          data: {
            userId: new ObjectId().toHexString(),
            content: 'test',
            hostId,
            hostType: 'post_newsfeed',
            authorProfileId: new ObjectId().toHexString(),
          },
        }),
      ),
    );

    const getCommentsQuery = `
        query getContentComments(
            $id:ID!
            $cursor:String
            $take:Int
        ){
            getContentComments(
                id:$id
                cursor:$cursor
                take:$take
            ){
                id
                hostId
                userId
            }
        }
    `;

    const res = await reqGql(
      getCommentsQuery,
      { id: mockUserId, take: 13 },
      mockedUser,
    );

    expect(res.body.errors).not.toBeDefined();
    const comments = res.body.data.getContentComments as Comment[];

    expect(comments.length).toBe(13);

    let top5Comments = comments.slice(0, 5);
    expect(
      top5Comments.every(
        (v) => !!friendsComments.find((f) => f.userId === v.id),
      ),
    ).toBe(true);

    let topSecond5Comments = comments.slice(5, 10);
    expect(
      topSecond5Comments.every(
        (v) => !!activeUsersComments.find((f) => f.userId === v.id),
      ),
    ).toBe(true);
  });
});
