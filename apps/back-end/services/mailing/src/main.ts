import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.MAILING_SERVICE.clientId,
      },
      consumer: {
        groupId: SERVICES.MAILING_SERVICE.groupId,
      },
    },
  });
  await app.startAllMicroservices();

  await app.listen(process.env.PORT || 3026);
}
bootstrap();
