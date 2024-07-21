import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.SEARCH_SERVICE.clientId,
      },
      consumer: {
        groupId: SERVICES.SEARCH_SERVICE.groupId,
      },
    },
  });
  await app.listen(process.env.PORT || 3008, () =>
    console.log(`🚀 search is ready at localhost:${3008}${''}`),
  );
}
bootstrap();
