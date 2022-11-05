import { Global, Module } from '@nestjs/common';
import { HashtagModule } from './hashtag/hashtag.module';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

@Module({
  imports: [HashtagModule, PrismaModule],
})
export class AppModule {}
