import { Module } from '@nestjs/common';
import { MangerService } from './manager.service';
import { MangerResolver } from './manager.resolver';
import { PrismaService } from 'prismaService';
import { MangerController } from './manager.controller';

@Module({
  providers: [MangerResolver, MangerService, PrismaService],
  controllers: [MangerController],
})
export class ManagerModule {}
