// import '../patch-express-adapter';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KafkaCustomTransport, KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:2999',
    ],
    credentials: true, // Required for cookies
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
