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
        clientId: SERVICES.SHOPPING_CART_SERVICE.clientId,
      },
      consumer: { groupId: SERVICES.SHOPPING_CART_SERVICE.groupId },
    }),
  });
  await app.startAllMicroservices();

  await app.listen(process.env.PORT || 3011, () =>
    console.log(`🚀 shopping-cart ready at localhost:${3011}${''}`),
  );
}
bootstrap();
