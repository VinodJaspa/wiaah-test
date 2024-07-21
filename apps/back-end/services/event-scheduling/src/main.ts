import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: KAFKA_BROKERS,
        clientId: SERVICES.EVENT_SCHEDULING.clientId,
      },
      consumer: {
        groupId: SERVICES.EVENT_SCHEDULING.groupId,
      },

      producer: {
        createPartitioner: Partitioners.LegacyPartitioner, // Add this line to use the legacy partitioner
      },
    },
  });
  await app.startAllMicroservices();

  await app.listen(process.env.PORT || 3031, () =>
    console.log(`🚀 event-scheduling is ready at localhost:${3031}${''}`),
  );
}
bootstrap();
