import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KafkaCustomTransport, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Specify the client's origin
    credentials: true, // Allow credentials such as cookies
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
    exposedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
  });
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new KafkaCustomTransport({
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.AUTH_SERVICE.clientId,
      },
      consumer: {
        groupId: SERVICES.AUTH_SERVICE.groupId,
      },
    }),
  });
  await app.startAllMicroservices();

  await app.listen(process.env.PORT || 3004, () =>
    console.log(`🚀 auth is ready at localhost:${3004}${''}`),
  );
}
bootstrap();
