import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KafkaCustomTransport, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.use(graphqlUploadExpress());
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new KafkaCustomTransport({
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.BILLING_SERVICE.clientId,
      },
      consumer: {
        groupId: SERVICES.BILLING_SERVICE.groupId,
      },
    }),
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3015);
}
bootstrap();
