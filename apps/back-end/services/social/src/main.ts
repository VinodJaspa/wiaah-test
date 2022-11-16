import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(3017);
}
bootstrap();
