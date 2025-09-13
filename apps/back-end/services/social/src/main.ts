import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KafkaCustomTransport, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload-ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 app.use(
    graphqlUploadExpress({
      maxFileSize: 50_000_000, // 50 MB
      maxFiles: 5,             // Max files per request
    }),
  );
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new KafkaCustomTransport({
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.SOCIAL_SERVICE.clientId,
      },
      consumer: {
        groupId: SERVICES.SOCIAL_SERVICE.groupId,
      },
    }),
  });
  await app.startAllMicroservices();

  await app.listen(process.env.PORT || 3017, () =>
    console.log(`🚀 social ready at localhost:${3017}${''}`),
  );
}
bootstrap();
