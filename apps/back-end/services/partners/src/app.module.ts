import { Module } from '@nestjs/common';
import { PartnersModule } from './partners/partners.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [PartnersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
