import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  AuthorizationDecodedUser,
  mockedUser,
  NestKafkaClientMock,
  requestGraphql,
  secendMockedUser,
  SERVICES,
} from 'nest-utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const mockKafka = new NestKafkaClientMock();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SERVICES.SOCIAL_SERVICE.token)
      .useValue(mockKafka)
      .compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    mockKafka.reset();
  });

  const reqGql = (query: string, vars: any, user: AuthorizationDecodedUser) =>
    requestGraphql(app, query, vars).set({ user: JSON.stringify(user) });

  it('should block, unblock and get blocklist', async () => {
    const getBlockListQuery = `
      query myBlockList {
        getMyBlockList {
          id
          blockedUserId
          blockedAt
        }
      }
    `;

    const blockMutation = `
      mutation blockUser(
        $userId:ID!
      ){
        blockUser(
          args:{
            userId:$userId
          }
        )
      }
    `;

    const unBlockMutation = `
      mutation unblockUser(
        $userId:ID!
      ){
        unblockUser(
          args:{
            userId:$userId
          }
        )
      }
    `;

    let blocklistRes = await reqGql(getBlockListQuery, {}, mockedUser);

    expect(blocklistRes.body.errors).not.toBeDefined();
    expect(blocklistRes.body.data.getMyBlockList).toHaveLength(0);

    const blockRes = await reqGql(
      blockMutation,
      { userId: secendMockedUser.id },
      mockedUser,
    );

    expect(blockRes.body.errors).not.toBeDefined();
    expect(blockRes.body.data.blockUser).toBe(true);

    blocklistRes = await reqGql(getBlockListQuery, {}, mockedUser);

    expect(blocklistRes.body.errors).not.toBeDefined();
    expect(blocklistRes.body.data.getMyBlockList).toHaveLength(1);
    expect(blocklistRes.body.data.getMyBlockList[0].blockedUserId).toBe(
      secendMockedUser.id,
    );

    const unblockRes = await reqGql(
      unBlockMutation,
      { userId: secendMockedUser.id },
      mockedUser,
    );

    expect(unblockRes.body.errors).not.toBeDefined();
    expect(unblockRes.body.data.unblockUser).toBe(true);

    blocklistRes = await reqGql(getBlockListQuery, {}, mockedUser);

    expect(blocklistRes.body.errors).not.toBeDefined();
    expect(blocklistRes.body.data.getMyBlockList).toHaveLength(0);
  });
});
