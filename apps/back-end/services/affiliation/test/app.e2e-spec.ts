import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  KAFKA_BROKERS,
  KAFKA_EVENTS,
  mockedUser,
  secendMockedUser,
  SERVICES,
  thirdMockedUser,
  waitFor,
} from 'nest-utils';
import { Kafka } from 'kafkajs';
import { AffiliatedProductPurchasedEvent } from 'nest-dto';
import { PrismaClient } from '@prisma-client';

describe('app (e2e)', () => {
  let app: INestApplication;
  const kafka = new Kafka({
    brokers: KAFKA_BROKERS,
    clientId: SERVICES.AFFILIATION_SERVICE.clientId,
  });

  let prisma = new PrismaClient();

  let producer = kafka.producer();
  let consumer = kafka.consumer({
    groupId: SERVICES.AFFILIATION_SERVICE.groupId,
  });

  beforeAll(async () => {
    await producer.connect();
    await consumer.connect();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: KAFKA_BROKERS,
          clientId: SERVICES.AFFILIATION_SERVICE.clientId,
        },
        consumer: {
          groupId: SERVICES.AFFILIATION_SERVICE.groupId,
        },
      },
    });
    await app.startAllMicroservices();
    await app.init();
  });

  jest.setTimeout(10000);
  afterAll(async () => {
    if (app) await app.close();
    await producer.disconnect();
    await consumer.disconnect();
  });

  it('should create ', async () => {
    await producer.send({
      topic: KAFKA_EVENTS.AFFILIATION.affiliatedProductPurchased,
      messages: [
        {
          value: new AffiliatedProductPurchasedEvent({
            affiliatorId: mockedUser.id,
            itemId: mockedUser.shopId,
            itemSellerId: secendMockedUser.id,
            itemType: 'product',
            purchaserId: thirdMockedUser.id,
          }).toString(),
        },
      ],
    });

    await waitFor(async () => {
      expect(await prisma.affiliationPurchase.findMany()).toHaveLength(1);
    });
  });
});
