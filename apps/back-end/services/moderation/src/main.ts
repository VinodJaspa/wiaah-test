import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT || 3027, () =>
    console.log(`🚀 moderation is ready at localhost:${3027}${''}`),
  );
}
bootstrap();
