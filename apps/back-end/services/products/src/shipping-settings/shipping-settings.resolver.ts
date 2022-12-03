import { Resolver, Query } from '@nestjs/graphql';
import { ShippingSettingsService } from './shipping-settings.service';
import { ShippingSetting } from './entities/shipping-setting.entity';
import { Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_SERVICE_TOKEN,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';

@Resolver(() => ShippingSetting)
export class ShippingSettingsResolver implements OnModuleInit {
  constructor(
    private readonly shippingSettingsService: ShippingSettingsService,
    @Inject(SERVICES.SHIPPING_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  @Query(() => [ShippingSetting])
  getAllShipping(): Promise<ShippingSetting[]> {
    return this.shippingSettingsService.getAll();
  }

  @UseGuards(GqlAuthorizationGuard)
  @Query(() => ShippingSetting)
  getMyShippingSettings(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<ShippingSetting> {
    return this.shippingSettingsService.getOneByUserId(user.id);
  }

  async onModuleInit() {
    await this.eventsClient.connect();
  }
}
