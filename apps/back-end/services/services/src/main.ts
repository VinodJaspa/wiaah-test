import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KafkaCustomTransport, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress());

  app.connectMicroservice<MicroserviceOptions>({
    strategy: new KafkaCustomTransport({
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.SERVICES_SERIVCE.clientId,
      },
      consumer: {
        groupId: SERVICES.SERVICES_SERIVCE.groupId,
      },
    }),
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  await app.init();

  await app.listen(process.env.PORT || 3020, () =>
    console.log(`🚀 services is ready at localhost:${3020}${''}`),
  );
}
bootstrap();
