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
 app.use(
    graphqlUploadExpress({
      maxFileSize: 50_000_000, // 50 MB
      maxFiles: 5,             // Max files per request
    }),
  );
  await app.startAllMicroservices();

  await app.listen(process.env.PORT || 3006, () =>
    console.log(`🚀 products is ready at localhost:${3006}${''}`),
  );
}
bootstrap();
