import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ActionResolver } from './action.resolver';
import { ActionController } from './action.controller';
import { ActionCommandHandlers } from './commands';
import { ActionQueryHandlers } from './queries';
import { ActionRepository } from './repository';
import { ActionEventHandlers } from './events';
import { kafkaModule } from '@kafkaModule';
import { UploadModule, UploadServiceProviders } from '@wiaah/upload';
import { EffectService } from 'src/effect/effect.service';

@Module({
  imports: [
    CqrsModule,
    kafkaModule,
    UploadModule.forRoot({
      secretKey: 'secret',
      serviceKey: 'servicekey',
      provider: UploadServiceProviders.CLOUDFLARE,
    }),
  ],
  providers: [
    ActionResolver,
    ActionRepository,
    EffectService,
    ...ActionCommandHandlers,
    ...ActionQueryHandlers,
    ...ActionEventHandlers,
  ],
  controllers: [ActionController],
})
export class ActionModule {}
