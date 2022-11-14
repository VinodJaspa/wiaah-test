import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  ClientKafka,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import {
  AuthorizationDecodedUser,
  KAFKA_BROKERS,
  MockedAdminUser,
  mockedUser,
  requestGraphql,
  SERVICES,
} from 'nest-utils';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver } from '@nestjs/apollo';
import {
  CreateMembershipInput,
  MembershipTurnoverRuleInput,
  UpdateMembershipInput,
  UpdateMembershipTurnoverRuleInput,
} from '@membership/dto';
import { PrismaService } from 'prismaService';

jest.setTimeout(10000);

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let eventClient: ClientKafka;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

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

  const updateInput: (
    id: string,
    turnoverRules: UpdateMembershipTurnoverRuleInput[],
  ) => UpdateMembershipInput = (id, rules) => ({
    id,
    includings: [{ title: 'test u t' }, { title: 'test u t 2' }],
    name: 'test up mem',
    turnover_rules: rules,
    type: 'monthly',
  });

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

  async function updateMembership(
    id: string,
    turnoverRules: UpdateMembershipTurnoverRuleInput[],
    user: AuthorizationDecodedUser = mockedUser,
  ) {
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

    return reqGraphql(query, updateInput(id, turnoverRules), user);
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
  });

  it('should update membership', async () => {
    const created = await createMembership(MockedAdminUser);

    let updated = await updateMembership(
      created.body.data.createMembership.id,
      [],
    );
    console.log(JSON.stringify(updated.body, null, 2));

    expect(updated.body.errors).toBeDefined();
    expect(updated.body.data).toBeNull();
    const rules = await prisma.membershipTurnoverRule.findMany();

    updated = await updateMembership(
      created.body.data.createMembership.id,
      [
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
      MockedAdminUser,
    );

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
