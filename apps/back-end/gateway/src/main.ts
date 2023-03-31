import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoClient, ServerApiVersion } from 'mongodb';
require('dotenv').config();

const uri = process.env.ACCOUNTS_DB_URI || '';
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3002',
      'http://localhost:3001',
    ],
    credentials: true,
  });
  await client.connect();
  await app.listen(3003);
}
bootstrap();
