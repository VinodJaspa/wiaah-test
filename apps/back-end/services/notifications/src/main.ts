import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS, SERVICES } from 'nest-utils';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: KAFKA_BROKERS,
  //     },
  //   },
  // });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3025);
  console.log('=====> Listening to localhost:3025');
}
bootstrap();
