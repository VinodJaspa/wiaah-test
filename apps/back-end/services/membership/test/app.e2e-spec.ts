import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import {
  ClientKafka,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import {
  AuthorizationDecodedUser,
  KAFKA_BROKERS,
  KAFKA_EVENTS,
  MockedAdminUser,
  mockedUser,
  NestKafkaClientMock,
  requestGraphql,
  SERVICES,
  waitFor,
} from 'nest-utils';
import {
  CreateMembershipInput,
  UpdateMembershipInput,
  UpdateMembershipTurnoverRuleInput,
} from '@membership/dto';
import { PrismaService } from 'prismaService';
import { BillingMonthlyPriceCreatedEvent } from 'nest-dto';
import { MembershipPricesType } from '@membership/const';

jest.setTimeout(10000);

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let eventClient: ClientKafka;
  let mockKafka = new NestKafkaClientMock();

  beforeEach(async () => {
    mockKafka.reset();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SERVICES.MEMBERSHIP.token)
      .useValue(mockKafka)
      .compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: KAFKA_BROKERS,
          clientId: SERVICES.MEMBERSHIP.clientId,
        },
        consumer: {
          groupId: SERVICES.MEMBERSHIP.groupId,
        },
      },
    });

    eventClient = moduleFixture.get(SERVICES.MEMBERSHIP.token);
    prisma = moduleFixture.get(PrismaService);
    await app.startAllMicroservices();
    await app.init();
  });

  afterAll(async () => {
    await eventClient.close();
    await app.close();
  });

  const reqGraphql = (
    query: string,
    vars: any,
    user: AuthorizationDecodedUser,
  ) => requestGraphql(app, query, vars).set({ user: JSON.stringify(user) });

  const createInput: CreateMembershipInput = {
    includings: [{ title: 'test t' }],
    name: 'test mem',
    turnover_rules: [
      {
        commission: 15,
        price: 5,
        turnover_amount: 300,
      },
      {
        commission: 20,
        price: 15,
        turnover_amount: 600,
      },
    ],
    type: 'monthly',
  };

  let updateInput: UpdateMembershipInput = {
    id: '',
    includings: [{ title: 'test u t' }, { title: 'test u t 2' }],
    name: 'test up mem',
    turnover_rules: [],
    type: 'monthly',
  };

  async function createMembership(user: AuthorizationDecodedUser = mockedUser) {
    const query = `
    mutation createMem(
      $includings:[MembershipIncludedItemInput!]!
      $name:String!
      $turnover_rules:[MembershipTurnoverRuleInput!]!
      $type:MembershipType!
      ){
        createMembership(
          args:{
            name:$name
            type:$type
            turnover_rules:$turnover_rules
            includings:$includings
          }
        ){
          id
        }
    }`;

    return reqGraphql(query, createInput, user);
  }

  async function updateMembership(user: AuthorizationDecodedUser = mockedUser) {
    const query = `
    mutation updateMem(
      $id:ID!
      $includings:[UpdateMembershipIncludedItemInput!]!
      $name:String!
      $turnover_rules:[UpdateMembershipTurnoverRuleInput!]!
      $type:MembershipType!
      ){
        updateMembership(
          args:{
            id:$id
            name:$name
            type:$type
            turnover_rules:$turnover_rules
            includings:$includings

          }
        ){
          id
        }
    }`;

    return reqGraphql(query, updateInput, user);
  }

  it('should create membership', async () => {
    let res = await createMembership();

    expect(res.body.errors).toBeDefined();
    expect(res.body.data).toBeNull();

    res = await createMembership(MockedAdminUser);

    expect(res.body.errors).not.toBeDefined();
    expect((await prisma.membership.findMany()).length).toBe(1);
    expect(await prisma.membership.findFirst()).toMatchObject({
      id: res.body.data.createMembership.id,
    });

    expect((await prisma.membershipTurnoverRule.findMany()).length).toBe(2);
    expect(await prisma.membershipTurnoverRule.findMany()).toMatchObject(
      createInput.turnover_rules,
    );

    const rules = await prisma.membershipTurnoverRule.findMany();

    await waitFor(() => {
      expect(mockKafka.emit).toBeCalledTimes(2);
      expect(mockKafka.emit.mock.calls[0]).toEqual([
        KAFKA_EVENTS.BILLING_EVNETS.createMonthlyBillingPrice,
        new BillingMonthlyPriceCreatedEvent({
          id: rules[0].id,
          price: rules[0].price,
          type: MembershipPricesType.turnover,
        }),
      ]);

      expect(mockKafka.emit.mock.calls[1]).toEqual([
        KAFKA_EVENTS.BILLING_EVNETS.createMonthlyBillingPrice,
        new BillingMonthlyPriceCreatedEvent({
          id: rules[1].id,
          price: rules[1].price,
          type: MembershipPricesType.turnover,
        }),
      ]);
    });
  });

  it('should update membership', async () => {
    const created = await createMembership(MockedAdminUser);

    let updated = await updateMembership(created.body.data.createMembership.id);

    expect(updated.body.errors).toBeDefined();
    expect(updated.body.data).toBeNull();
    const rules = await prisma.membershipTurnoverRule.findMany();

    updateInput = {
      ...updateInput,
      id: created.body.data.createMembership.id,
      turnover_rules: [
        {
          id: rules.at(0).id,
          commission: 65,
          price: 48,
          turnover_amount: 23454,
        },
        {
          id: rules.at(1).id,
          commission: 158,
          price: 49,
          turnover_amount: 123484,
        },
      ],
    };

    updated = await updateMembership(MockedAdminUser);

    expect(updated.body.errors).not.toBeDefined();
    expect((await prisma.membership.findMany()).length).toBe(1);
    expect(await prisma.membership.findFirst()).toMatchObject({
      id: updated.body.data.updateMembership.id,
    });

    expect((await prisma.membershipTurnoverRule.findMany()).length).toBe(2);
    expect(await prisma.membershipTurnoverRule.findMany()).toMatchObject([
      { id: rules.at(0).id, commission: 65, price: 48, turnover_amount: 23454 },
      {
        id: rules.at(1).id,
        commission: 158,
        price: 49,
        turnover_amount: 123484,
      },
    ]);
  });
});
