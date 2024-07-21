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
        clientId: SERVICES.CHAT.clientId,
      },
      consumer: {
        groupId: SERVICES.CHAT.groupId,
      },
    },
  });
  await app.listen(process.env.PORT || 3022, () =>
    console.log(`🚀 chat is ready at localhost:${3022}${''}`),
  );
}
bootstrap();
