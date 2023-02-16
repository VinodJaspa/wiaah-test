import { kafkaModule } from '@kafkaModule';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProfileService } from '@profile-service';
import { PrismaService } from 'prismaService';
import { ProfileAdminResolver } from './profile-admin.resolver';

@Module({
  imports: [kafkaModule, CqrsModule],
  providers: [ProfileAdminResolver, ProfileService, PrismaService],
})
export class ProfileAdminModule {}
