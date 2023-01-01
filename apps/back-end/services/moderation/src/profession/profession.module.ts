import { Module } from '@nestjs/common';
import { ProfessionResolver } from './profession.resolver';
import { ProfessionController } from './profession.controller';

@Module({
  providers: [ProfessionResolver],
  controllers: [ProfessionController],
})
export class ProfessionModule {}
