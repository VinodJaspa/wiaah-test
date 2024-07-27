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
      },
      consumer: {
        groupId: SERVICES.AFFILIATION_SERVICE.groupId,
      },
    },
  });
  await app.startAllMicroservices();

  await app.listen(process.env.PORT || 3029, () =>
    console.log(`🚀 affiliatoin is ready at localhost:${3029}${''}`),
  );
}
bootstrap();
