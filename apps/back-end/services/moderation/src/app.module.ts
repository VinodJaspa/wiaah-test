import { Module } from '@nestjs/common';
import { ReportModule } from '@report/report.module';
import { ContentSuspenseModule } from './content-suspense/content-suspense.module';
import { KafkaModule } from './kafka.module';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [ReportModule, ContentSuspenseModule, PrismaModule, KafkaModule],
})
export class AppModule {}
