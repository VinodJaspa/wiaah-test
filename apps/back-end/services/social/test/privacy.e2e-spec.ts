import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  AuthorizationDecodedUser,
  KAFKA_BROKERS,
  KAFKA_EVENTS,
  mockedUser,
  NestKafkaClientMock,
  requestGraphql,
  SERVICES,
  waitFor,
} from 'nest-utils';
import { Kafka } from 'kafkajs';
import { AccountDeletedEvent, NewAccountCreatedEvent } from 'nest-dto';
import { PrismaService } from 'prismaService';
import { PrivacySettings } from '@privacy-settings/entities';

import { AppModule } from '../src/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const kafka = new Kafka({
  brokers: KAFKA_BROKERS,
  clientId: SERVICES.SOCIAL_SERVICE.clientId,
});

const producer = kafka.producer();

describe('privacy e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let mockKafka = new NestKafkaClientMock();

  beforeAll(async () => {
    await producer.connect();
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    prisma = module.get(PrismaService);

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        consumer: {
          groupId: SERVICES.SOCIAL_SERVICE.groupId,
        },
        client: {
          brokers: KAFKA_BROKERS,
          clientId: SERVICES.SOCIAL_SERVICE.clientId,
        },
      },
    });
    await app.startAllMicroservices();
    await app.init();
  });

  beforeEach(async () => {
    mockKafka.reset();
  });
  afterAll(async () => {
    await producer.disconnect();
    if (app) {
      await app.close();
    }
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  it('should update and get my privacy settings', async () => {
    await prisma.privacySettings.create({
      data: {
        userId: mockedUser.id,
      },
    });

    const myPrivacyQuery = `
      query getMyPrivacySettings{
        getMyPrivacySettings{
            userId
            privateAccount
            hideLikesNum
            hideCommentsNum
            hideViewsNum
        }
      }
    `;

    const updatePrivateAccMutation = `
    mutation update (
        $privAcc:Boolean
    ){
        updateMyPrivacySettings(
            args:{
                privateAccount:$privAcc
            }
        ){
            userId
            privateAccount
            hideLikesNum
            hideCommentsNum
            hideViewsNum
        }
    }
    `;
    const updateHideLikesNumMutation = `
    mutation update (
        $hide:Boolean
    ){
        updateMyPrivacySettings(
            args:{
                hideLikesNum:$hide
            }
        ){
            userId
            privateAccount
            hideLikesNum
            hideCommentsNum
            hideViewsNum
        }
    }
    `;

    const updateHideCommentsMutation = `
    mutation update (
        $hide:Boolean
    ){
        updateMyPrivacySettings(
            args:{
                hideCommentsNum:$hide
            }
        ){
            userId
            privateAccount
            hideLikesNum
            hideCommentsNum
            hideViewsNum
        }
    }
    `;

    const updateHideViewsMutation = `
    mutation update (
        $hide:Boolean
    ){
        updateMyPrivacySettings(
            args:{
                hideViewsNum:$hide
            }
        ){
            userId
            privateAccount
            hideLikesNum
            hideCommentsNum
            hideViewsNum
        }
    }
    `;

    let myPrivacy = await reqGql(myPrivacyQuery, {}, mockedUser);

    expect(myPrivacy.body.errors).not.toBeDefined();
    expect(myPrivacy.body.data.getMyPrivacySettings).toMatchObject({
      userId: mockedUser.id,
      privateAccount: false,
      hideLikesNum: false,
      hideCommentsNum: false,
      hideViewsNum: false,
    });

    const privAccRes = await reqGql(
      updatePrivateAccMutation,
      { privAcc: true },
      mockedUser,
    );

    expect(privAccRes.body.errors).not.toBeDefined();
    myPrivacy = await reqGql(myPrivacyQuery, {}, mockedUser);

    expect(myPrivacy.body.errors).not.toBeDefined();
    expect(myPrivacy.body.data.getMyPrivacySettings).toMatchObject({
      userId: mockedUser.id,
      privateAccount: true,
      hideLikesNum: false,
      hideCommentsNum: false,
      hideViewsNum: false,
    });

    const hideLikesRes = await reqGql(
      updateHideLikesNumMutation,
      { hide: true },
      mockedUser,
    );

    expect(hideLikesRes.body.errors).not.toBeDefined();
    myPrivacy = await reqGql(myPrivacyQuery, {}, mockedUser);

    expect(myPrivacy.body.errors).not.toBeDefined();
    expect(myPrivacy.body.data.getMyPrivacySettings).toMatchObject({
      userId: mockedUser.id,
      privateAccount: true,
      hideLikesNum: true,
      hideCommentsNum: false,
      hideViewsNum: false,
    });

    const hideCommentsRes = await reqGql(
      updateHideCommentsMutation,
      { hide: true },
      mockedUser,
    );

    expect(hideCommentsRes.body.errors).not.toBeDefined();
    myPrivacy = await reqGql(myPrivacyQuery, {}, mockedUser);

    expect(myPrivacy.body.errors).not.toBeDefined();
    expect(myPrivacy.body.data.getMyPrivacySettings).toMatchObject({
      userId: mockedUser.id,
      privateAccount: true,
      hideLikesNum: true,
      hideCommentsNum: true,
      hideViewsNum: false,
    });

    const hideViewsRes = await reqGql(
      updateHideViewsMutation,
      { hide: true },
      mockedUser,
    );

    expect(hideViewsRes.body.errors).not.toBeDefined();
    myPrivacy = await reqGql(myPrivacyQuery, {}, mockedUser);

    expect(myPrivacy.body.errors).not.toBeDefined();
    expect(myPrivacy.body.data.getMyPrivacySettings).toMatchObject({
      userId: mockedUser.id,
      privateAccount: true,
      hideLikesNum: true,
      hideCommentsNum: true,
      hideViewsNum: true,
    });
  });

  it('should create and delete privacy settings on account create/deleted kafka events', async () => {
    await producer.send({
      topic: KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated,
      messages: [
        {
          value: new NewAccountCreatedEvent({
            email: mockedUser.email,
            id: mockedUser.id,
            username: '',
            accountType: mockedUser.accountType,
            firstName: mockedUser.firstName,
            lastName: mockedUser.lastName,
          }).toString(),
        },
      ],
    });

    await waitFor(async () => {
      const res = await prisma.privacySettings.findMany();
      expect(res.length).toBe(1);
      expect(res[0]).toMatchObject({
        hideCommentsNum: false,
        hideLikesNum: false,
        hideViewsNum: false,
        privateAccount: false,
        userId: mockedUser.id,
      } as PrivacySettings);
    });

    await producer.send({
      topic: KAFKA_EVENTS.ACCOUNTS_EVENTS.accountDeleted,
      messages: [
        {
          value: new AccountDeletedEvent({
            accountId: mockedUser.id,
          }).toString(),
        },
      ],
    });

    await waitFor(async () => {
      const res = await prisma.privacySettings.findMany();
      expect(res.length).toBe(0);
    });
  });
});
