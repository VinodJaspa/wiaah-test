import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { DynamicModule } from '@nestjs/common';
import { StripeForRootOptions } from './types';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class StripeModule {
  static forRoot(options: StripeForRootOptions): DynamicModule {
    return {
      module: StripeModule,
      providers: [
        StripeService,
        {
          provide: 'options',
          useValue: options,
        },
      ],
      imports: [ConfigModule.forRoot()],
      exports: [StripeService],
    };
  }
}
