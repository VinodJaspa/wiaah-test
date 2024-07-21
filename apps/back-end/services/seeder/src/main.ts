import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3040, () =>
    console.log(`🚀 seeder is ready at localhost:${3040}${''}`),
  );
}
bootstrap();
