import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KafkaCustomTransport, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { mw } from 'request-ip';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new KafkaCustomTransport({
      client: {
        clientId: SERVICES.PRODUCTS_SERVICE.clientId,
        brokers: KAFKA_BROKERS,
      },
      consumer: {
        groupId: SERVICES.PRODUCTS_SERVICE.groupId,
      },
    }),
  });
  app.use(mw());
  app.use(graphqlUploadExpress());
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3006);
}
bootstrap();
