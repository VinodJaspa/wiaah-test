import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ProfileResolver, ProfileService, PrismaService],
})
export class ProfileModule {}
