import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KafkaCustomTransport, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new KafkaCustomTransport({
      client: {
        clientId: SERVICES.WISHLIST_SERVICE.clientId,
        brokers: KAFKA_BROKERS,
      },
      consumer: {
        groupId: SERVICES.WISHLIST_SERVICE.groupId,
      },
    }),
  });
  await app.startAllMicroservices();
  await app.listen(3009);
}
bootstrap();
