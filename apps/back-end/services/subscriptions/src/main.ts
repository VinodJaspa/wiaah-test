import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT || 3023, () =>
    console.log(`🚀 Subscriptions ready at ws://localhost:${3023}${''}`),
  );
}
bootstrap();
