import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('listening to localhost:3040');
  await app.listen(3040);
}
bootstrap();
