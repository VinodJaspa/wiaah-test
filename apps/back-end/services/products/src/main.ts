import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: SERVICES.PRODUCTS_SERVICE.clientId,
        brokers: KAFKA_BROKERS,
      },
      consumer: {
        groupId: SERVICES.PRODUCTS_SERVICE.groupId,
      },
    },
  });
  app.startAllMicroservices();
  app.use(graphqlUploadExpress());
  await app.listen(process.env.PORT || 3006);
}
bootstrap();
