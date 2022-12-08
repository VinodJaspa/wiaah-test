import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InsuranceResolver } from './insurance.resolver';
import { InsuranceRepository } from './repository';
import { InsuranceController } from './insurance.controller';

@Module({
  imports: [CqrsModule],
  providers: [InsuranceResolver, InsuranceRepository],
  controllers: [InsuranceController],
})
export class InsuranceModule {}
