import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { INJECT_TOKENS } from 'src/inject_tokens';
import { FixerService } from './fixer.service';
import { FixerServiceOptions } from './types/forRootOptions';

@Module({
  imports: [HttpModule],
})
export class FixerModule {
  static forRoot(options: FixerServiceOptions): DynamicModule {
    return {
      module: FixerModule,
      providers: [
        FixerService,
        {
          provide: INJECT_TOKENS.FIXER_TOKEN,
          useValue: options,
        },
      ],
      exports: [FixerService],
    };
  }
}
