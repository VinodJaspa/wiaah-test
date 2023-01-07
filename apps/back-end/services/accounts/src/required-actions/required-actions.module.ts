import { Module } from '@nestjs/common';
import { RequiredActionsService } from './required-actions.service';
import { RequiredActionsResolver } from './required-actions.resolver';

@Module({
  providers: [RequiredActionsResolver, RequiredActionsService]
})
export class RequiredActionsModule {}
