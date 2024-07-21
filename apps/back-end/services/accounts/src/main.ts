import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS } from 'nest-utils';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: KAFKA_BROKERS,
      },
    },
  });
  console.log('===> Listening to localhost:3005');
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3005);
}
bootstrap();
