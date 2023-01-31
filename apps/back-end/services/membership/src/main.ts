import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KafkaCustomTransport, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new KafkaCustomTransport({
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.MEMBERSHIP.clientId,
      },
      consumer: {
        groupId: SERVICES.MEMBERSHIP.groupId,
      },
    }),
  });
  await app.startAllMicroservices();
  await app.listen(3026);
}
bootstrap();
