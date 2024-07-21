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

  await app.startAllMicroservices();

  await app.listen(process.env.PORT || 3016, () =>
    console.log(`🚀 vouchers ready at localhost:${3016}${''}`),
  );
}
bootstrap();
