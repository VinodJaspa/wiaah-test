import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KafkaCustomTransport, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';
import 'dotenv/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.startAllMicroservices();

  await app.listen(process.env.PORT || 3014, () =>
    console.log(`🚀 orders is ready at localhost:${3014}${''}`),
  );
}
bootstrap();
