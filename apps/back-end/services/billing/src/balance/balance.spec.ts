import { INestApplication } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Test } from '@nestjs/testing';
import {
  KafkaCustomTransport,
  KAFKA_BROKERS,
  KAFKA_EVENTS,
  SERVICES,
  waitFor,
} from 'nest-utils';
import { AppModule } from '../app.module';
import { Kafka } from 'kafkajs';
import { OrderCanceledEvent } from 'nest-dto';
import { PrismaClient } from '@prisma-client';
import { ObjectId } from 'mongodb';

describe('Balance tests', () => {
  let app: INestApplication;

  const kafka = new Kafka({
    brokers: KAFKA_BROKERS,
  });

  const producer = kafka.producer();

  const prisma = new PrismaClient();

  beforeAll(async () => {
    await producer.connect();
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.connectMicroservice<MicroserviceOptions>({
      strategy: new KafkaCustomTransport({
        client: {
          brokers: KAFKA_BROKERS,
          clientId: SERVICES.BILLING_SERVICE.clientId,
        },
        consumer: {
          groupId: SERVICES.BILLING_SERVICE.groupId,
        },
      }),
    });

    await app.startAllMicroservices();
  });

  afterAll(async () => {
    producer.disconnect();
  });

  it('should update buyer and seller withdrawable balance on order cancelaton', async () => {
    const buyerId = new ObjectId().toHexString();
    const sellerId = new ObjectId().toHexString();

    await prisma.balance.create({
      data: {
        ownerId: buyerId,
        withdrawableBalance: 100,
      },
    });

    await prisma.balance.create({
      data: {
        ownerId: sellerId,
        withdrawableBalance: 500,
      },
    });

    producer.send({
      topic: KAFKA_EVENTS.ORDERS_EVENTS.orderCanceled(),
      messages: [
        {
          value: new OrderCanceledEvent({
            buyerId,
            sellerId,
            total: 300,
          } as any).toString(),
        },
      ],
    });

    await waitFor(async () => {
      const buyerBalance = await prisma.balance.findUnique({
        where: {
          ownerId: buyerId,
        },
      });

      const sellerBalance = await prisma.balance.findUnique({
        where: {
          ownerId: sellerId,
        },
      });

      expect(buyerBalance.withdrawableBalance).toBe(400);
      expect(sellerBalance.withdrawableBalance).toBe(200);
    });
  });
});
