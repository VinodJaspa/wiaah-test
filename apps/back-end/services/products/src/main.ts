import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
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
  app.startAllMicroservices();
  await app.listen(3006);
}
bootstrap();
