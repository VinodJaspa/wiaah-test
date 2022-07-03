import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  KAFKA_BROKERS,
  KAFKA_SERVICE_CLIENTID,
  KAFKA_SERVICE_GROUPID,
} from 'nest-utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: KAFKA_BROKERS,
        clientId: KAFKA_SERVICE_CLIENTID,
      },
      consumer: {
        groupId: KAFKA_SERVICE_GROUPID,
      },
    },
  });
  await app.listen(3015);
}
bootstrap();
