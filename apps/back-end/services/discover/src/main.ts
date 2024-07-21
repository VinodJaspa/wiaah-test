import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT || 3030, () =>
    console.log(`🚀 discover is ready at localhost:${3030}${''}`),
  );
}
bootstrap();
