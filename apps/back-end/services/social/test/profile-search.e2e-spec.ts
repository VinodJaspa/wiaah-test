import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { ProfileModule } from '@profile-module';
import { ObjectId } from 'mongodb';
import {
  KafkaCustomTransport,
  KAFKA_BROKERS,
  AuthorizationDecodedUser,
  requestGraphql,
  getUserFromRequest,
  mockedUser,
} from 'nest-utils';
import { PrismaClient } from 'prismaClient';
import { PrismaModule } from '@prisma-module';
import { Profile } from '@entities';

describe('comments e2e tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    let moduleFixture = await Test.createTestingModule({
      imports: [
        ProfileModule,
        PrismaModule,
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
          driver: ApolloFederationDriver,
          autoSchemaFile: true,
          context: (ctx) => ({ ...ctx, user: getUserFromRequest(ctx.req) }),
        }),
      ],
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
  let client = new PrismaClient();

  const createUsersGroup = async (name: string, count: number = 5) => {
    for (const idx of [...Array(count)].map((_, i) => i + 1)) {
      await client.profile.create({
        data: {
          lastActive: new Date(),
          ownerId: new ObjectId().toHexString(),
          photo: 'test photo',
          profession: 'proff',
          username: name,
          followers: idx,
        },
      });
    }
  };

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  it('should search profiles', async () => {
    await createUsersGroup('test name');
    await createUsersGroup('username');
    await createUsersGroup('test');

    const query = `
      query get(
          $q:String!
          $cursor:String
          $take:Int
      ){
          searchPopularUsers(
            args:{
              q:$q
              cursor:$cursor
              take:$take
            }
          ){
              total
              hasMore
              data{
                id
                username
                followers
              }
          }
      }
    `;

    let res = await reqGql(query, { q: 'test' }, mockedUser);

    expect(res.body.errors).not.toBeDefined();
    let data = res.body.data.searchPopularUsers.data as Profile[];
    expect(data).toHaveLength(10);

    res = await reqGql(query, { q: 'user' }, mockedUser);

    expect(res.body.errors).not.toBeDefined();

    data = res.body.data.searchPopularUsers.data as Profile[];
    expect(data).toHaveLength(5);

    expect(data[0].followers).toBe(5);
    expect(data[1].followers).toBe(4);

    res = await reqGql(query, { q: 'name' }, mockedUser);

    expect(res.body.errors).not.toBeDefined();
    data = res.body.data.searchPopularUsers.data as Profile[];
    expect(data).toHaveLength(10);

    expect(data[0].followers).toBe(5);
    expect(data[1].followers).toBe(5);
    expect(data[2].followers).toBe(4);
    expect(data[3].followers).toBe(4);
  });
});
