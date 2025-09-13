import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS } from 'nest-utils';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
dotenv.config();
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'accounts-service',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'accounts-consumer-group', // must be unique per microservice
      },
    },
  });
  await app.startAllMicroservices();
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3005, () =>
    console.log(`🚀 accounts ready at ws://localhost:${3005}${''}`),
  );
}
bootstrap();
