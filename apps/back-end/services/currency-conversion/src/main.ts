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
        clientId: SERVICES.CURRENCY_SERVICE.clientId,
      },
      consumer: {
        groupId: SERVICES.CURRENCY_SERVICE.groupId,
      },
    },
  });
  app.startAllMicroservices();

  await app.listen(process.env.PORT || 3012, () =>
    console.log(`🚀 currency-conversion is ready at localhost:${3012}${''}`),
  );
}
bootstrap();
