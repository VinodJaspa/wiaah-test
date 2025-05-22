import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { VerifyAndGetUserFromContext } from 'nest-utils';
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
  app.use(graphqlUploadExpress());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3002',
      'http://localhost:3001',
      'http://localhost:2999',
    ],
    credentials: true,
  });
  app.use(async (req, res, next) => {
    try {
      const { user } = await VerifyAndGetUserFromContext({ req, res });
  
      if (user) {
        req.user = user;
        console.log('✅ User added to req:', user);
      } else {
        console.warn('❌ No user found in token');
      }
  
      next();
    } catch (err) {
      console.error('❌ Error in auth middleware:', err);
      next();
    }
  });

  await app.listen(3003);
}
bootstrap();
