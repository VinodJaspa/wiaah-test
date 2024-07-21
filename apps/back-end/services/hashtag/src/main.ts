import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT || 3024, () =>
    console.log(`🚀 hashtag is ready at localhost:${3024}${''}`),
  );
}
bootstrap();
