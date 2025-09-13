import { Global, Module } from "@nestjs/common";
import { StripeService } from "./stripe.service";
import { DynamicModule } from "@nestjs/common";
import { StripeForRootOptions } from "./types";
import { ConfigModule } from "@nestjs/config";
import { STRIPE_INJECT_TOKEN } from "./constent";
import Stripe from "stripe";

@Global()
@Module({})
export class StripeModule {
  static forRoot(options: StripeForRootOptions): DynamicModule {
    return {
      module: StripeModule,
      providers: [
        StripeService,
        {
          provide: "options",
          useValue: options,
        },
        {
          provide: STRIPE_INJECT_TOKEN,
          useValue: new Stripe(options.apiKey, {
            apiVersion: null,
            typescript: true,
          }),
        },
      ],
      imports: [ConfigModule.forRoot()],
      exports: [StripeService],
    };
  }
}
