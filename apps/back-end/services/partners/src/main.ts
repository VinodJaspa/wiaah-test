import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KafkaCustomTransport, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('listening to localhost:3000');
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new KafkaCustomTransport({
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.ORDERS_SERVICE.clientId,
      },
      consumer: {
        groupId: SERVICES.ORDERS_SERVICE.groupId,
      },
    }),
  });

  await app.listen(process.env.PORT || 3000, () =>
    console.log(`🚀 partners is ready at localhost:${3000}${''}`),
  );
}
bootstrap();
