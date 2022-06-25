import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: SERVICES.SHOP_SERVICE.clientId,
        brokers: KAFKA_BROKERS,
      },
      consumer: {
        groupId: SERVICES.SHOP_SERVICE.groupId,
      },
    },
  });
  app.startAllMicroservices();
  await app.listen(3007);
}
bootstrap();
