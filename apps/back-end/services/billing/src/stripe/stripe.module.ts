import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { DynamicModule } from '@nestjs/common';
import { StripeForRootOptions } from './types';

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
      exports: [StripeService],
    };
  }
}
