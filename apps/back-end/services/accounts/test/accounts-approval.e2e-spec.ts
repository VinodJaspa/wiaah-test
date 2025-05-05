import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { AccountStatus, PrismaClient } from '@prisma-client';
import e from 'express';
import { Kafka } from 'kafkajs';
import {
  BuyerAccountRegisteredEvent,
  SellerAccountRegisteredEvent,
} from 'nest-dto';
import {
  accountType,
  AuthorizationDecodedUser,
  KafkaCustomTransport,
  KAFKA_BROKERS,
  KAFKA_EVENTS,
  MockedAdminUser,
  mockedUser,
  requestGraphql,
  SERVICES,
  waitFor,
} from 'nest-utils';
import { AppModule } from '../src/app.module';

describe('Accounts approval e2e', () => {
  let app: INestApplication;
  const kafka = new Kafka({
    brokers: KAFKA_BROKERS,
    clientId: SERVICES.ACCOUNTS_SERVICE.clientId,
  });

  const producer = kafka.producer();

  const prisma = new PrismaClient();

  beforeAll(async () => {
    await producer.connect();
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app.connectMicroservice<MicroserviceOptions>({
      strategy: new KafkaCustomTransport({
        client: {
          brokers: KAFKA_BROKERS,
          clientId: SERVICES.ACCOUNTS_SERVICE.clientId,
        },
        consumer: {
          groupId: SERVICES.ACCOUNTS_SERVICE.groupId,
        },
      }),
    });

    app = module.createNestApplication();

    await app.startAllMicroservices();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
    await producer.disconnect();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, u).set({ user: JSON.stringify(u) });

  it('should create seller with the correct status', async () => {
    await producer.send({
      topic: KAFKA_EVENTS.AUTH_EVENTS.sellerAccountRegistered,
      messages: [
        {
          value: new SellerAccountRegisteredEvent({
            companyRegisterationNumber: '132465',
            email: 'test@email.com',
            firstName: 'test',
            lastName: 'test2',
            password: '12346',
          }).toString(),
        },
      ],
    });

    await waitFor(async () => {
      const acc = await prisma.account.findFirst();
      expect(acc.status).toBe(AccountStatus.pending);
    });

    await producer.send({
      topic: KAFKA_EVENTS.AUTH_EVENTS.sellerAccountRegistered,
      messages: [
        {
          value: new BuyerAccountRegisteredEvent({
            email: 'test@email.com',
            firstName: 'test',
            lastName: 'test2',
            password: '12346',
          }).toString(),
        },
      ],
    });

    await waitFor(async () => {
      const acc = await prisma.account.findFirst();
      expect(acc.status).toBe(AccountStatus.pending);
    });
  });

  it('should create buyer with the correct status', async () => {
    await producer.send({
      topic: KAFKA_EVENTS.AUTH_EVENTS.sellerAccountRegistered,
      messages: [
        {
          value: new BuyerAccountRegisteredEvent({
            email: 'test@email.com',
            firstName: 'test',
            lastName: 'test2',
            password: '12346',
          }).toString(),
        },
      ],
    });

    await waitFor(async () => {
      const acc = await prisma.account.findFirst();
      expect(acc.status).toBe(AccountStatus.active);
    });
  });

  it('should approve seller account', async () => {
    const created = await prisma.account.create({
      data: {
        email: 'test@email.com',
        firstName: 'test',
        lastName: 'test2',
        password: '12346',
        type: accountType.SELLER,
        status: AccountStatus.pending,
      },
    });

    const approveQuery = `
    Mutation accept($id:String!){
        acceptSellerAccount(
            id:$id
        )
    }
    `;

    let res = await reqGql(
      approveQuery,
      {
        id: created.id,
      },
      mockedUser,
    );

    let accounts = await prisma.account.findMany();
    expect(res.body.errors).toBeDefined();
    expect(accounts).toHaveLength(1);
    expect(accounts[0].status).toBe(AccountStatus.pending);

    res = await reqGql(
      approveQuery,
      {
        id: created.id,
      },
      MockedAdminUser,
    );

    accounts = await prisma.account.findMany();

    expect(res.body.errors).not.toBeDefined();
    expect(accounts).toHaveLength(1);
    expect(accounts[0].status).toBe(AccountStatus.active);
  });

  it('should refuse seller account', async () => {
    const created = await prisma.account.create({
      data: {
        email: 'test@email.com',
        firstName: 'test',
        lastName: 'test2',
        password: '12346',
        type: accountType.SELLER,
        status: AccountStatus.pending,
      },
    });

    const refuseQuery = `
    Mutation refuse($id:String!){
        declineSellerAccount(
            id:$id
        )
    }
    `;

    let res = await reqGql(
      refuseQuery,
      {
        id: created.id,
      },
      mockedUser,
    );

    let accounts = await prisma.account.findMany();
    expect(res.body.errors).toBeDefined();
    expect(accounts).toHaveLength(1);
    expect(accounts[0].status).toBe(AccountStatus.pending);

    res = await reqGql(
      refuseQuery,
      {
        id: created.id,
      },
      MockedAdminUser,
    );

    accounts = await prisma.account.findMany();

    expect(res.body.errors).not.toBeDefined();
    expect(accounts).toHaveLength(1);
    expect(accounts[0].status).toBe(AccountStatus.refused);
  });

  it('should get only pending sellers', async () => {
    const pending = await prisma.account.createMany({
      data: [...Array(3)].map((_, i) => ({
        email: `test${i}@email.com`,
        firstName: 'test',
        lastName: 'test2',
        password: '12346',
        type: accountType.SELLER,
        status: AccountStatus.pending,
      })),
    });
    const active = await prisma.account.createMany({
      data: [...Array(3)].map((_, i) => ({
        email: `test${i + 2 * 5}@email.com`,
        firstName: 'test',
        lastName: 'test2',
        password: '12346',
        type: accountType.SELLER,
        status: AccountStatus.active,
      })),
    });
    const buyers = await prisma.account.createMany({
      data: [...Array(3)].map((_, i) => ({
        email: `test${i + 2 * 10}@email.com`,
        firstName: 'test',
        lastName: 'test2',
        password: '12346',
        type: accountType.BUYER,
        status: AccountStatus.active,
      })),
    });

    const sellersQuery = `
    query get(
        $take:Int!
        $page:Int!
    ){
        getPendingSellers(
            pagination:{
                take:$take
                page:$page
            }
        ){
            id
        }
    }
    `;

    let res = await reqGql(
      sellersQuery,
      {
        take: 5,
        page: 1,
      },
      mockedUser,
    );

    expect(res.body.errors).toBeDefined();

    res = await reqGql(
      sellersQuery,
      {
        take: 5,
        page: 1,
      },
      MockedAdminUser,
    );

    const accs = res.body.data.getPendingSellers;
    expect(res.body.errors).not.toBeDefined();
    expect(accs).toHaveLength(3);
  });
});
