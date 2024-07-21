import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { KafkaCustomTransport } from 'nest-utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new KafkaCustomTransport({
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.ANALYTICS_SERVICE.clientId,
      },
      consumer: {
        groupId: SERVICES.ANALYTICS_SERVICE.groupId,
        allowAutoTopicCreation: true,
      },
    }),
  });
  await app.startAllMicroservices();

  await app.listen(process.env.PORT || 3032, () =>
    console.log(`🚀 analytics is ready at localhost:${3032}${''}`),
  );
}
bootstrap();
