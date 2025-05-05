import { CreateActionInput } from '@action/dto';
import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import { AppModule } from '@prisma-module';
import { Kafka } from 'kafkajs';
import {
  AuthorizationDecodedUser,
  KAFKA_BROKERS,
  mockedUser,
  requestGraphql,
  SERVICES,
} from 'nest-utils';
import { PrismaClient } from 'prismaClient';

describe('action e2e', () => {
  let app: INestApplication;
  const prisma = new PrismaClient();
  const kafka = new Kafka({
    brokers: KAFKA_BROKERS,
    clientId: SERVICES.SOCIAL_SERVICE.clientId,
  });

  const producer = kafka.producer();

  beforeAll(async () => {
    await producer.connect();
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: KAFKA_BROKERS,
          clientId: SERVICES.SOCIAL_SERVICE.clientId,
        },
        consumer: {
          groupId: SERVICES.SOCIAL_SERVICE.groupId,
        },
      },
    });
    await app.startAllMicroservices();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
    await producer.disconnect();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  const getUserActions = (
    userId: string,
    take: number,
    page: number,
    user: AuthorizationDecodedUser,
  ) => {
    const query = `
    query get(
      $userId:ID!
      $pagination:GqlPaginationInput!
    ){
      getUserActions(
        args:{
          userId:$userId
          pagination:$pagination
        }
      ){
        id
        userId
      }
    }`;

    return reqGql(query, { userId, pagination: { take, page } }, user);
  };

  it('should create action', async () => {
    const createMutation = `
    mutation create(
        $attach:AttachmentInput!
    ){
        createAction(
            args:{
                attachment:$attach
            }
        )
    }
    `;

    const createInput: CreateActionInput = {
      attachment: {
        src: 'test',
        type: 'vid',
      },
    };

    const res = await reqGql(
      createMutation,
      { attach: createInput.attachment },
      mockedUser,
    );

    expect(res.body.errors).not.toBeDefined();

    expect(await prisma.action.findMany()).toHaveLength(1);
    expect((await prisma.action.findMany()).at(0)).toMatchObject({
      ...createInput,
      userId: mockedUser.id,
    });
  });

  it('should get actions', async () => {
    for (const i of [...Array(9)]) {
      await prisma.action.create({
        data: {
          attachment: {
            src: 'test',
            type: 'vid',
          },
          userId: mockedUser.id,
        },
      });
    }
    expect(await prisma.action.findMany()).toHaveLength(10);

    const res = await getUserActions(mockedUser.id, 5, 1, mockedUser);
    expect(res.body.errors).not.toBeDefined();
    expect(res.body.data.getUserActions).toHaveLength(5);
    expect(
      res.body.data.getUserActions.every(
        (v: any) => v.userId === mockedUser.id,
      ),
    ).toBe(true);
  });
});
