import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';
import { raw } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.SERVICES_SERIVCE.clientId,
      },
      consumer: {
        groupId: SERVICES.SERVICES_SERIVCE.groupId,
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3020);
}
bootstrap();
