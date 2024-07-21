import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.AFFILIATION_SERVICE.clientId,
      },
      consumer: {
        groupId: SERVICES.AFFILIATION_SERVICE.groupId,
      },
    },
  });
  console.log('=====> Listening to localhost:3029');
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3029);
}
bootstrap();
