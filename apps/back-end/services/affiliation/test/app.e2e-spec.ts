import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { Kafka } from 'kafkajs';

describe('app (e2e)', () => {
  let app: INestApplication;
  const kafka = new Kafka({
    brokers: KAFKA_BROKERS,
    clientId: SERVICES.AFFILIATION_SERVICE.clientId,
  });

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

  afterAll(async () => {
    if (app) await app.close();
    await producer.disconnect();
    await consumer.disconnect();
  });

  it('should create ', () => {});
});
