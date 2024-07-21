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
        clientId: SERVICES.VOUCHERS_SERVICE.clientId,
      },
      consumer: {
        groupId: SERVICES.VOUCHERS_SERVICE.groupId,
      },
    },
  });
  console.log('====> Listening to localhost:3016');

  await app.startAllMicroservices();
  await app.listen(3016);
}
bootstrap();
