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
        clientId: SERVICES.AUTH_SERVICE.clientId,
      },
      consumer: {
        groupId: SERVICES.AUTH_SERVICE.groupId,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3004);
}
bootstrap();
