import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import {
  AuthorizationDecodedUser,
  KafkaCustomTransport,
  KAFKA_BROKERS,
  MockedAdminUser,
  mockedUser,
  requestGraphql,
  SERVICES,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { AppModule } from '../../app.module';
import { CreateProfessionInput } from '../dto/create-profession.input';
import { UpdateProfessionInput } from '../dto/update-profession.input';

describe('profession tests', () => {
  let app: INestApplication;

  const prisma = new PrismaService();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.connectMicroservice<MicroserviceOptions>({
      strategy: new KafkaCustomTransport({
        client: {
          brokers: KAFKA_BROKERS,
          clientId: SERVICES.MODERATION.clientId,
        },
        consumer: {
          groupId: SERVICES.MODERATION.groupId,
        },
      }),
    });

    await app.startAllMicroservices();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const reqGql = (q: string, v: any, u: AuthorizationDecodedUser) =>
    requestGraphql(app, q, v).set({ user: JSON.stringify(u) });

  const getProfessions = `query get{
      getProfessions{
        id
        title
        sortOrder
        usage
      }
    }`;

  const updateMutation = `
    mutation update($input:UpdateProfessionInput){
      updateProfession:{
        args:$input
      }
    }`;

  const createMutation = `
    mutation create($input:CreateProfessionInput){
      createProfession:{
        args:$input
      }
    }`;

  it('should get all professions', async () => {
    prisma.profession.create({
      data: {
        title: 'actor',
      },
    });
    prisma.profession.create({
      data: {
        title: 'doctor',
      },
    });
    const res = await reqGql(getProfessions, {}, mockedUser);

    expect(res.body.errors).not.toBeDefined();
    expect(res.body.data.getProfessions).toHaveLength(2);
  });

  it('should create profession', async () => {
    const input: CreateProfessionInput = {
      status: 'inActive',
      sortOrder: 5,
      title: 'actor',
    };

    let res = await reqGql(createMutation, input, mockedUser);

    expect(res.body.errors).toBeDefined();

    res = await reqGql(createMutation, input, MockedAdminUser);

    expect(res.body.errors).not.toBeDefined();
    expect((await prisma.profession.findMany()).length).toBe(1);
    expect(await prisma.profession.findFirst()).toMatchObject(input);
  });

  it('should update profession', async () => {
    const created = await prisma.profession.create({
      data: {
        title: 'test',
      },
    });
    const input: UpdateProfessionInput = {
      id: created.id,
      status: 'inActive',
      sortOrder: 4,
      title: 'actor',
    };

    let res = await reqGql(updateMutation, input, mockedUser);

    expect(res.body.errors).toBeDefined();

    res = await reqGql(updateMutation, input, MockedAdminUser);

    expect(res.body.errors).not.toBeDefined();
    expect((await prisma.profession.findMany()).length).toBe(1);
    expect(await prisma.profession.findFirst()).toMatchObject(input);
  });
});
