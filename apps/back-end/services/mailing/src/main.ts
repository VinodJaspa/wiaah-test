import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: SERVICES.MAILING_SERVICE.clientId,
        brokers: KAFKA_BROKERS,
      },
      consumer: {
        groupId: SERVICES.MAILING_SERVICE.groupId,
      },
    },
  });

  await app.listen();
}
bootstrap();
